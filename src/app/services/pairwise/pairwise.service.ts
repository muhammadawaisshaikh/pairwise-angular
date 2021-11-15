import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from '../../common/node/node';
import { NodeModel } from '../../common/node-model/node-model';

@Injectable({
  providedIn: 'root'
})
export class PairwiseService {

  private updateFinalResultUrl = 'https://pairwise-backend.herokuapp.com/v1/update';
  private getListOfNodesUrlOld = 'https://pairwise-backend.herokuapp.com/v1/nodes';
  private getListOfNodesUrl = 'https://pairwise-backend.herokuapp.com/nodes';
  private getTreeNodeUrl = 'https://pairwise-backend.herokuapp.com/v1/tree';
  private baseUrl = 'https://pairwise-backend.herokuapp.com/v1/pairwise';
  private fileUpload = 'http://localhost:8081/v1/upload';
  private fileDownload = 'https://pairwise-backend.herokuapp.com/v1/example-download';

  constructor(
    private httpClient: HttpClient
  ) { }

  getPairwiseResult(data: number[][]): Observable<number[][]> {
    return this.httpClient.post<number[][]>(this.updateFinalResultUrl, data);
  }

  getListOfNodes(): Observable<GetResponseNode> {
    return this.httpClient.get<GetResponseNode>(this.getListOfNodesUrl);
  }

  addNode(node: Node): Observable<Node[]> {
    return this.httpClient.post<Node[]>(this.baseUrl, node);
  }

  deleteNode(nodeIdToDelete: number): Observable<Node[]> {
    const deleteUrl = `${this.baseUrl}?nodeId=${nodeIdToDelete}`;
    return this.httpClient.delete<Node[]>(deleteUrl);
  }

  updateNode(node: Node): Observable<Node[]> {
    return this.httpClient.put<Node[]>(this.baseUrl, node);
  }

  getTreeNode(): Observable<NodeModel[]> {
    return this.httpClient.get<NodeModel[]>(this.getTreeNodeUrl);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.fileUpload}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.fileDownload}`);
  }
}

interface GetResponseNode {
  _embedded: {
    node: Node[];
  };
}