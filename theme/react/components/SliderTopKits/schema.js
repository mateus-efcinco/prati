export const schema = {
  title: `Carousel Component`,
  description: 'A Carousel Component',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Título da vitrine'
    },
    banners: {
      type: 'array',
      title: 'Banners',
      minItems: 1,
      items: {
        type: 'object',
        title: 'Banner',
        properties: {
          points: {
            type: 'string',
            title: 'Pontos',
            description: 'Quantos pontos o cliente ganha?'
          },
          title: {
            type: 'string',
            title: 'Título/Nome do kit',
            description: 'Título/Nome do Kit. Ex: Mudança de hábito'
          },
          description: {
            type: 'string',
            title: 'Descrição',
            description: 'Descrição, por ex: Contém 21 refeições 3 pratos de cada'
          },
          discount: {
            type: 'string',
            title: 'Desconto',
            description: 'Desconto, por ex: 50% off'
          },
          precoDe: {
            type: 'string',
            title: 'Preço DE',
            description: 'Preço de, por ex: 500,00'
          },
          precoPor: {
            type: 'string',
            title: 'Preço POR',
            description: 'Preço POR, por ex: 450,99'
          },
          link: {
            type: 'string',
            title: 'Link',
            description: 'Link para onde será levado'
          },
          imageDesk: {
            type: 'string',
            title: 'Image desktop',
            default: '',
            widget: {
              'ui:widget': 'image-uploader'
            }
          }
        }
      }
    },
    showComponent: {
      type: 'boolean',
      title: 'Show Component',
      default: true
    }
  }
}