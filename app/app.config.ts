export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'gray'
    },
    input: {
      defaultVariants: {
        size: 'lg'
      }
    },
    button: {
      defaultVariants: {
        size: 'lg'
      }
    },
    pageLinks: {
      slots: {
        title: 'text-sm font-semibold uppercase tracking-[0.2em] text-muted',
        list: 'gap-3'
      },
      variants: {
        active: {
          false: {
            link: 'text-default hover:text-primary'
          }
        }
      }
    },
    pageCard: {
      slots: {
        root: 'rounded-xl'
      }
    }
  }
})
