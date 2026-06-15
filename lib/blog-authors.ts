export type BlogAuthor = {
  id: string
  name: string
  role: string
  avatar: string
}

export const blogAuthors = {
  pedroGorrao: {
    id: 'pedro-gorrao',
    name: 'Pedro Gorrao',
    role: 'Co-Founder & CEO',
    avatar: '/images/author/gorrao.jpeg',
  },
  marcoMendao: {
    id: 'marco-mendao',
    name: 'Marco Mendao',
    role: 'Co-Founder & CTO',
    avatar: '/images/author/marco.jpg',
  },
} satisfies Record<string, BlogAuthor>

export type BlogAuthorId = keyof typeof blogAuthors
