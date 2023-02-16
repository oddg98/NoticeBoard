import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  creatingPost: boolean = false;
  allPosts: any;
  user: any;
  constructor(private router: Router, private boardSvc: BoardService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('userName');
    this.boardSvc.getPosts().subscribe((res) => {
      this.allPosts = res;
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  togglePostCreation() {
    this.creatingPost = !this.creatingPost;
    const postCreationForm = document
      .getElementById('create-post-section')
      ?.classList.toggle('hidden');
  }

  submitPost() {
    const title = (document.getElementById('postTitle') as HTMLInputElement)
      .value;
    const content = (document.getElementById('create-post') as HTMLInputElement)
      .value;
    const postBody = {
      title: title,
      author: this.user,
      content: content,
    };
    this.boardSvc.createPost(postBody).subscribe((res) => {
      this.togglePostCreation();
      this.boardSvc.getPosts().subscribe((posts) => {
        this.allPosts = posts;
      });
    });
  }
}
