import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit, AfterViewInit {
  articles: Article[] = [];
  totalPages = 0;
  currentPage = 1;
  pageSize = 6; // Number of articles per page

  constructor(private articleService: ArticleService,private router: Router) {}

  ngOnInit(): void {
    this.getArticles(this.currentPage);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToContent();
    }, 500); // Delay in milliseconds (adjust as needed)
  }

  getArticles(page: number): void {
    this.articleService
      .getArticles(page, this.pageSize)
      .subscribe((response) => {
        const publicArticles = response.articles.filter(
          (article) => article.is_public
        );
        this.articles = publicArticles;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.scrollToContent();
      this.getArticles(page);
    }
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  scrollToContent(): void {
    const container = document.querySelector('.container');
    if (container) {
      container.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  goToArticle(article: Article): void {
    this.router.navigate(['/article', article.id]);
  }
  
}
