import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const blogImagesDir = path.resolve('public/assets/blog');

async function generateThumbnails() {
    if (!fs.existsSync(blogImagesDir)) {
        console.error('Directory not found:', blogImagesDir);
        return;
    }

    const files = fs.readdirSync(blogImagesDir);
    let processed = 0;
    let skipped = 0;

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);

        // Skip non-images or files that are already thumbnails
        if (!isImage || file.includes('_thumb.')) {
            skipped++;
            continue;
        }

        const inputPath = path.join(blogImagesDir, file);
        const basename = path.basename(file, ext);
        const outputPath = path.join(blogImagesDir, `${basename}_thumb.webp`);

        // Skip if thumbnail already exists
        if (fs.existsSync(outputPath)) {
            skipped++;
            continue;
        }

        try {
            await sharp(inputPath)
                .resize({ width: 600, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);

            processed++;
            if (processed % 50 === 0) console.log(`Processed ${processed} images...`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log(`\nFinished! Generated ${processed} thumbnails. Skipped ${skipped} files.`);
}

generateThumbnails();
