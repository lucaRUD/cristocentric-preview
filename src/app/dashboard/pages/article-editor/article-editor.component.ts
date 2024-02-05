import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/article';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css'],
})
export class ArticleEditorComponent {
  article!: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;
    });
  }

  saveArticle(): void {
    if (this.article.id !== undefined) {
      this.articleService
        .updateArticle(this.article.id, this.article)
        .subscribe();
        this.showToaster('Changes saved.')
    }
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    // Upload the file to your server and update the specified article
    if (this.article.id !== undefined) {
      this.articleService
        .uploadFile(file, this.article.id)
        .subscribe((imagePath) => {
          // Construct the correct URL of the uploaded image file
          const domain = 'http://localhost:8000';
          const imageUrl = domain + imagePath;
          console.log(imageUrl);

          // Update the main_image property of the article with the URL of the uploaded file
          this.article.main_image = imageUrl;
          console.log(this.article.main_image);
        });
    }
  }

  openImageModal(imageUrl: string | undefined): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: imageUrl,
      // Add this CSS class for custom styling
    });
  }
  
}
