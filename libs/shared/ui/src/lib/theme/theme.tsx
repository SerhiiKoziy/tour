import { extendTheme } from '@chakra-ui/react';

const customTheme = {
  fonts: {
    body: 'Lato, sans-serif',
  },
  colors: {
    primary: {
      100: '#F400511A',
      500: '#FF3E3E',
      600: '#F40051',
    },
    gray: {
      100: '#FFFFFF',
      200: '#F9FAFA',
      300: '#F6F7F8',
      400: '#E8EBED',
      500: '#757C7F',
      600: '#3B3E3F',
      700: '#2B2E2F',
      // 100: '#2B2E2F',
      // 200: '#3B3E3F',
      // 300: '#757C7F',
      // 400: '#E8EBED',
      // 500: '#F6F7F8',
      // 600: '#F9FAFA',
      // 700: '#FFFFFF',
    },
    green: {
      100: '#479E4C1A',
      800: '#479E4C',
    },
    orange: {
      100: '#FFAD08',
    },
    red: {
      100: '#FF3E3E1A',
      800: '#FF3E3E',
    },
    blue: {
      100: '#198FD51A',
      800: '#198FD5',
      900: '#0A68AE',
    },
    purple: {
      400: '#9747FF',
    },
    darkGray: {
      500: '#F6F7F8',
      600: '#E8EBED',
    },
    gradientOverlay: {
      dark: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 52.88%, rgba(0, 0, 0, 0.8) 100%)',
      light: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
      dark50: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
      halfLinearDark:
        'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
    },
  },
  shadows: {
    shadow: {
      100: '0px 8px 48px rgba(45, 51, 57, 0.08);',
    },
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          bg: 'gray.100',
          border: null, // Setting this as null to be able to override the default value for width and color
          borderColor: 'gray.400',
          borderRadius: 'lg',
          borderWidth: '1px',
          color: 'gray.700',
          _placeholder: {
            color: 'gray.500',
          },
          _hover: {
            borderColor: 'gray.400',
          },
          // TODO use this if we are allowed to use a plain border color
          _focus: {
            boxShadow: null,
            borderColor: '#FEA5AB',
            bg: 'gray.100',
          },
          _focusVisible: {
            boxShadow: null,
            borderColor: '#FEA5AB',
            bg: 'gray.100',
          },
          _disabled: {
            bg: 'gray.300',
          },
          // TODO use this if we are NOT allowed to use a plain border color
          // This _focus and _focusVisible hack to have a gradient border is hacky
          // and it does not allow to have a custom background in focus event
          // Also, the user might not notice the difference between a single color and this two-colors gradient
          // TODO ask Eric if this is really needed
          // TODO ask Oleh and Eric if this meets the a11y requirements (contrast ratio 3:1)
          /*_focus: {
            boxShadow: null,
            borderColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            background: `
              linear-gradient(var(--chakra-colors-gray-100), var(--chakra-colors-gray-100)) padding-box,
              linear-gradient(#FF242440, #F4005140) border-box;`,
          },
          _focusVisible: {
            boxShadow: null,
            borderColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            background: `
              linear-gradient(var(--chakra-colors-gray-100), var(--chakra-colors-gray-100)) padding-box,
              linear-gradient(#FF242440, #F4005140) border-box;`,
          },*/
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.400',
            _hover: {
              borderColor: 'gray.500',
            },
            // I do not know why this is not setting these attrs from the base style for this _focusVisible prop
            // maybe it is a bug in Chakra UI
            _focusVisible: {
              boxShadow: null,
              // borderColor: 'transparent', // TODO use this if we are NOT allowed to use a plain border color
              borderColor: '#FEA5AB', // TODO use this if we are allowed to use a plain border color
            },
            _invalid: {
              boxShadow: null,
            },
          },
        },
        groupUnstyled: {
          field: {
            borderWidth: 0,
            _focus: {
              borderWidth: '1px',
            },
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          bg: 'gray.100',
          border: null, // Setting this as null to be able to override the default value for width and color
          borderColor: 'gray.400',
          borderRadius: 'lg',
          borderWidth: '1px',
          color: 'gray.700',
          _placeholder: {
            color: 'gray.500',
          },
          _focusVisible: {
            boxShadow: null,
            bg: 'gray.400',
          },
        },
      },
      variants: {
        ghost: {
          _hover: {
            borderColor: 'gray.500',
          },
          field: {
            borderWidth: 0,
            _hover: {
              borderColor: 'gray.500',
            },
          },
        },
        outline: {
          field: {
            borderColor: 'gray.400',
            _hover: {
              borderColor: 'gray.500',
            },
            _focusVisible: {
              boxShadow: null,
              borderColor: '#FEA5AB',
            },
            _invalid: {
              boxShadow: null,
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        border: null, // Setting this as null to be able to override the default value for width and color
        borderColor: 'gray.400',
        borderRadius: 'lg',
        borderWidth: '1px',
        color: 'gray.700',
        _placeholder: {
          color: 'gray.500',
        },
        _focusVisible: {
          boxShadow: null,
          bg: 'gray.400',
        },
      },
      variants: {
        outline: {
          borderColor: 'gray.400',
          _hover: {
            borderColor: 'gray.500',
          },
          _focusVisible: {
            boxShadow: null,
            bg: 'gray.100',
            borderColor: 'gray.500',
          },
          _invalid: {
            boxShadow: null,
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          border: null,
          borderColor: 'gray.400',
        },
        item: {
          _focus: {
            bg: 'gray.400',
          },
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        _hover: {
          bg: 'gray.400',
        },
        _focus: {
          bg: 'gray.400',
        },
        _focusVisible: {
          boxShadow: null,
          bg: 'gray.400',
        },
      },
      variants: {
        solid: {
          color: 'gray.100',
        },
        ghost: {
          color: 'gray.700',
          _hover: {
            bg: 'gray.300',
          },
        },
        outline: {
          bg: 'gray.100',
          borderColor: 'gray.400',
          _hover: {
            bg: 'gray.300',
            _disabled: {
              bg: 'gray.400',
            },
          },
          _active: {
            bg: 'gray.400',
          },
        },
        link: {
          bg: 'transparent',
          _hover: {
            bg: 'transparent',
          },
          _focus: {
            bg: 'transparent',
          },
        },
        gradient: {
          bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #FF2424 0%, #F40051 100%)',
          color: 'gray.100',
          _hover: {
            bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #F40051E6 0%, #F40051 100%)',
            _disabled: {
              color: 'gray.100',
              bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #FF2424 0%, #F40051 100%)',
            },
          },
          _active: {
            bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #F40051E6 0%, #F40051 100%)',
          },
          _focus: {
            bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #F40051E6 0%, #F40051 100%)',
          },
          _focusVisible: {
            bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #F40051E6 0%, #F40051 100%)',
          },
          _disabled: {
            color: 'gray.100',
            bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #FF2424 0%, #F40051 100%)',
          },
        },
      },
      defaultProps: {
        variant: 'ghost',
        colorScheme: 'gray',
      },
    },
    Progress: {
      variants: {
        orange: {
          filledTrack: {
            background: 'orange.100',
          },
        },
        primary: {
          filledTrack: {
            background: 'primary.500',
          },
        },
      },
    },
    Tag: {
      baseStyle: {
        fontWeight: 'bold',
      },
      defaultProps: {
        variant: 'subtle',
        colorScheme: 'primary',
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          lineHeight: 5,
          fontWeight: 'medium',
        },
      },
      sizes: {
        md: {
          tablist: {
            gap: 6,
            height: 12,
          },
          tab: {
            paddingX: 0,
            height: 12,
          },
          tabpanel: {
            paddingX: 0,
          },
        },
      },
      variants: {
        line: {
          tablist: {
            borderColor: 'gray.400',
            borderBottom: '1px solid',
          },
          tab: {
            color: 'gray.500',
            _selected: {
              color: 'gray.700',
            },
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'line',
      },
    },
  },
};

export const theme = extendTheme({ ...customTheme });

export default theme;
