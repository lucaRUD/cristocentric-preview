import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from 'src/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8000/articles/';
  private createArticleUrl = 'http://localhost:8000/create-article/';

  constructor(private http: HttpClient) {}

  getArticles(
    page: number,
    pageSize: number
  ): Observable<{
    articles: Article[];
    totalPages: number;
    currentPage: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response: any) => {
        const articles = response.articles.map((article: Article) => {
          // Append the full URL for the main_image property
          return {
            ...article,
            main_image: `http://localhost:8000${article.main_image}`,
          };
        });

        const totalPages = response.total_pages;
        const currentPage = response.current_page;

        return { articles, totalPages, currentPage };
      })
    );
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.createArticleUrl, article);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    const url = `${this.apiUrl}${id}/update/`;
    const { main_image, ...articleWithoutMainImage } = article;
    return this.http.put<Article>(url, articleWithoutMainImage).pipe(
      map((updatedArticle: Article) => {
        // Append the full URL for the main_image property
        return {
          ...updatedArticle,
          main_image: `http://localhost:8000${updatedArticle.main_image}`,
        };
      })
    );
  }

  deleteArticle(id: number): Observable<{}> {
    const url = `${this.apiUrl}${id}/delete/`;
    return this.http.delete(url);
  }
  getArticle(id: number): Observable<Article> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Article>(url).pipe(
      map((article: Article) => {
        // Append the full URL for the main_image property
        return {
          ...article,
          main_image: `http://localhost:8000${article.main_image}`,
        };
      })
    );
  }

  uploadFile(file: File, articleId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    // Replace this URL with the URL of your file upload API endpoint
    const url = `http://localhost:8000/upload-file/${articleId}/`;

    return this.http
      .post<{ url: string }>(url, formData)
      .pipe(map((response) => response.url));
  }
}
