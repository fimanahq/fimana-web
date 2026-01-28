export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'orange',
      neutral: 'slate'
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
      },
      defaultVariants: {
        variant: 'subtle'
      }
    },
    navigationMenu: {
      variants: {
        orientation: {
          vertical: {
            link: 'py-2 px-3'
          }
        }
      },
      compoundVariants: [
        {
          orientation: 'vertical',
          collapsed: true,
          class: {
            link: 'justify-center w-9 h-9'
          }
        }
      ]
    },
    dashboardSearchButton: {
      slots: {
        base: 'min-h-9 min-w-9'
      },
      variants: {
        collapsed: {
          true: {
            trailing: 'justify-center w-9 h-9'
          }
        }
      }
    }
  }
})
