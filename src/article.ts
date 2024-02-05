export interface Article {
    id?: number;
    title: string;
    content: string;
    author: string;
    date?: string;
    category: string;
    main_image?: string;
    is_archived?: boolean;
    is_public?:boolean;
  }
  