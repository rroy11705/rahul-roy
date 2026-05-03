import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Auto-populate author with current user
        if (req.user && !data.author) {
          data.author = req.user.id
        }

        // Auto-calculate read time based on content (average 200 words per minute)
        if (data.content) {
          try {
            let textContent = '';

            // Handle Lexical editor content structure
            if (typeof data.content === 'object' && data.content.root) {
              const extractText = (node: any): string => {
                if (!node) return '';
                if (typeof node === 'string') return node;
                if (node.text) return node.text;
                if (node.children && Array.isArray(node.children)) {
                  return node.children.map(extractText).join(' ');
                }
                return '';
              };
              textContent = extractText(data.content.root);
            } else if (typeof data.content === 'string') {
              textContent = data.content.replace(/<[^>]*>/g, '');
            }

            const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
            data.readTime = Math.max(1, Math.ceil(wordCount / 200)); // Minimum 1 minute
          } catch (error) {
            console.warn('Read time calculation error:', error);
            data.readTime = 1; // Default to 1 minute if calculation fails
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-blog-post")',
      },
    },
    {
      name: 'description',
      type: 'text',
      maxLength: 250,
      required: true,
      admin: {
        description: 'Short preview description (max 250 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main blog content',
      },
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main cover image for the blog',
      },
    },
    {
      name: 'contentImages',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Additional images to display in the blog content carousel',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Tags for categorization and related blog suggestions',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Blog author (auto-populated with current user)',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        description: 'Date when the blog was published',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Estimated read time in minutes (auto-calculated)',
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of views (used for popularity tracking)',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
}
