import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newpost } from '../interfaces/newpost';
import { Getposts } from '../interfaces/getposts';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = 'http://localhost:4400/posts'
  constructor(private http: HttpClient) { }

  uploadFile(filedata: any) {
    return this.http.post('http://localhost:4400/upload', filedata);
  }

  getPosts() {
    return this.http.get<Getposts>(this.url);
  }  

  addPost(post: string, imgname:string) {
    let postbody = {
      post: post,
      thumbnail: imgname
    }
    return this.http.post<Newpost>(this.url, postbody)
  }

  updatePosts(ID:number, post:string) {
    let updatebody = {
      ID: ID,
      post: post
    }
    return this.http.put<{updatedpost:[], message:any}>(this.url, updatebody);
  }

  deletePosts(id: number) {
    return this.http.delete<{ delete: any, message: any }>(this.url + '/' + id);
  }

}
