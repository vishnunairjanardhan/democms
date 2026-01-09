import { ArrowUpRightIcon } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MatterButton } from '@/components/ui/matter-button'
import { MotionPreset } from '@/components/ui/motion-preset'

import {
  HeroNavigation,
  HeroNavigationSmallScreen
} from '@/components/shadcn-studio/blocks/hero-section-38/hero-navigation'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-section-38/hero-navigation'

import { cn } from '@/lib/utils'

import MatterLogo from '@/assets/svg/matter-logo'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  return (
    <MotionPreset
      component='header'
      fade
      slide={{ direction: 'up' }}
      delay={3.4}
      transition={{ duration: 0.5 }}
      inView={false}
      className={cn('z-50 h-21 w-full', className)}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='#'>
          <div className='flex items-center gap-3'>
            <MatterLogo className='size-8' />
            <span className='text-foreground font-[Orbitron] text-[1.75rem] leading-6.5 font-bold'>Matter</span>
          </div>
        </a>

        {/* Navigation */}
        <HeroNavigation navigationData={navigationData} className='max-lg:hidden' />

        {/* Navigation for small screens */}
        <div className='flex items-center gap-4'>
          <MatterButton size='lg' className='max-sm:hidden' asChild>
            <a href='#'>
              Schedule a demo
              <ArrowUpRightIcon />
            </a>
          </MatterButton>

          <Tooltip>
            <TooltipTrigger className='sm:hidden' asChild>
              <MatterButton size='icon-lg' asChild>
                <a href='#'>
                  <ArrowUpRightIcon />
                  <span className='sr-only'>Schedule a demo</span>
                </a>
              </MatterButton>
            </TooltipTrigger>
            <TooltipContent>Schedule a demo</TooltipContent>
          </Tooltip>

          <HeroNavigationSmallScreen navigationData={navigationData} />
        </div>
      </div>
    </MotionPreset>
  )
}

export default Header
