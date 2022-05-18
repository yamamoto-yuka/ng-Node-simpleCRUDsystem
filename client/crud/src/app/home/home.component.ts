import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  post: string = '';
  Status = false;
  showMessage = 'none';
  Messagge: any = '';
  constructor(private cs: CommonService) { }
  
  getPost() {
    this.cs.getPosts().subscribe(posts => {
      this.posts = posts.data;
      console.log(posts.data);
    })
  }

  addPost() {
    this.cs.addPost(this.post).subscribe(newpost => {
      console.log(newpost);
      this.showMessage = 'block';
      this.Status = newpost.newpost;
      this.Messagge = newpost;
      console.log(newpost.data[0].ID);
      this.getPost();
    })
  }

  editPost(id: number) {
    this.cs.updatePosts(id, this.post).subscribe(updatepost => {
      console.log(updatepost);
      this.getPost();




      
    })
  }

  deletePost(ID: number) {
    if(confirm('Are you sure?')){
      this.cs.deletePosts(ID).subscribe(deletepost => {
        console.log(deletepost);
        this.getPost();
      })
    }
  }
  ngOnInit(): void {
  }

}
