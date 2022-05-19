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
  imageformData: any;
  constructor(private cs: CommonService) { }
  
  onChange(event:any) {
    let file:File = event.target.files
    console.log(file);
    const formData = new FormData();
    console.log(formData);
    // Append file date with name of input tag
    formData.append('file', file);
    console.log(formData);
    this.imageformData = formData;
  }

  uploadImage() {
    
  }

  getPost() {
    this.cs.getPosts().subscribe(posts => {
      this.posts = posts.data;
      console.log(posts.data);
    })
  }

  addPost() {
    this.cs.addPost(this.post).subscribe(insertedPost => {
      console.log(insertedPost);
      this.posts.push(insertedPost.data[0]);
      console.log(insertedPost.data[0].ID);
      this.showMessage = 'block';
      this.Status = insertedPost.newpost;
      this.Messagge = insertedPost;
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
      this.cs.deletePosts(ID).subscribe(deletedpost => {
        console.log(deletedpost.delete);
        if (deletedpost.delete === 1) {
        // Getting the index
          let index = this.posts.findIndex(postid => postid.ID === ID);
          console.log(index);
        // Deleting the value from the Array
          this.posts.splice(index, 1);
        }
      })
    }
  }

  ngOnInit(): void {
    this.getPost();
  }

}
