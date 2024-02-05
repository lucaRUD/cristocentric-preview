import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/article';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  articles: Article[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 5; // Number of articles per page

  constructor(
    private articleService: ArticleService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService

  ) {}

  showToaster(message:string){
    this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'left'
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.articles = response.articles;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
  }

  createArticle(): void {
    const newArticle: Article = {
      title: 'Post Title',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.',
      author: 'User',
      category: 'Word',
      main_image: undefined, // Initialize the main_image property as undefined
    };

    this.articleService.createArticle(newArticle).subscribe((article) => {
      // Append the base URL to the article main_image
      article.main_image = `http://localhost:8000${article.main_image}`;
      this.articles.push(article);
      this.showToaster('Article created.')
    });
  }

  viewArticle(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['dashboard/articles/article-editor', id]);
    }
  }

  confirmDelete(id: number | undefined) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteArticle(id);
          this.showToaster('Article deleted.')
        }
      });
    }
  }

  deleteArticle(id: number | undefined) {
    if (id !== undefined) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter((article) => article.id !== id);
      });
    }
  }

  archiveArticle(id: number | undefined): void {
    if (id !== undefined) {
      const article = this.articles.find((article) => article.id === id);
      if (article) {
        const updatedArticle = {
          ...article,
          is_archived: true,
          is_public: false,
        };
        this.articleService
          .updateArticle(id, updatedArticle)
          .subscribe((article) => {
            const index = this.articles.findIndex(
              (article) => article.id === id
            );
            if (index !== -1) {
              this.articles[index] = article;
            }
          });
          this.showToaster('Article archived.')
      }
    }
  }

  togglePublic(id: number | undefined): void {
    if (id !== undefined) {
      const article = this.articles.find((article) => article.id === id);
      if (article) {
        const updatedArticle = {
          ...article,
          is_public: !article.is_public,
          is_archived: article.is_public ? article.is_archived : false,
        };
        this.articleService
          .updateArticle(id, updatedArticle)
          .subscribe((article) => {
            const index = this.articles.findIndex(
              (article) => article.id === id
            );
            if (index !== -1) {
              this.articles[index] = article;
            }
          });
          this.showToaster('Artcile updated.')
      }
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getArticles();
    }
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
