export interface JobCreateUpdateRequest {
    id?: number;
    title: string;
    slug: string;
    description: string;
    price: number;
  
    coverPath: string;
    filePath: string;
  
    categoryId: number;
    authorId: number;
  }