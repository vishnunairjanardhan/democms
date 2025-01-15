tailwind.config = {
    theme: {
      extend: {
        animation: {
          // adjust speed according to your need
          marquee: 'infinite-scroll 25s linear infinite',
        },
        keyframes: {
          marquee: {
            from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
          }
        }
      }
    },
    variants: {
      extend: {
        animation: ['hover', 'focus'],
      }
    },
  }