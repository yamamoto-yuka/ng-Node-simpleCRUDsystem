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
  imgname: string = '';
  constructor(private cs: CommonService) { }
  
  onChange(event:any) {
    let file: File = event.target.files[0];
    this.imgname = file.name;
    console.log(file.name);
    const formData = new FormData();
    console.log(formData);
    // Append file date with name of input tag
    formData.append('image', file);
    console.log(formData);
    this.imageformData = formData;
  }

  uploadImage() {
    this.cs.uploadFile(this.imageformData).subscribe(response => {
      console.log(response);
    } )
  }

  getPost() {
    this.cs.getPosts().subscribe(posts => {
      this.posts = posts.data;
      console.log(posts);
    })
  }

  addPost() {
    // Insert data API ( new post content, just name of this file)
    this.cs.addPost(this.post, this.imgname).subscribe(insertedPost => {
      // console.log(insertedPost);
      console.log(insertedPost.data[0].thumbnail);
      let newPost = insertedPost.data[0];
      // Then upload the image to physical folder ( which is the "uploads" folder on server side)
      this.cs.uploadFile(this.imageformData).subscribe(response => {
          this.posts.unshift(newPost);
      })
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
