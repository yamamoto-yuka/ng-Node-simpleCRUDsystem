import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newpost } from '../interfaces/newpost';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = 'http://localhost:4400/posts'
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{data:[], message:any}>(this.url);
  }  

  addPost(post:string) {
    let postbody = {
      post: post
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
    return this.http.delete<{ delete: [], message: any }>(this.url + '/' + id);
  }

}
