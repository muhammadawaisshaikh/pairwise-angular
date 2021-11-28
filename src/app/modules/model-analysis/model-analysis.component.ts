import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Node } from 'src/app/common/node/node';
import { PairwiseService } from 'src/app/services/pairwise/pairwise.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-model-analysis',
  templateUrl: './model-analysis.component.html',
  styleUrls: ['./model-analysis.component.scss']
})
export class ModelAnalysisComponent implements OnInit {

  nodes: Node[] = [];
  nodeNameInput: string = '';
  updateNameOfNode: string = '';
  addNodeNameParent: any = 0;
  deleteNodeName: any = 0;
  renameParentNodeId: any = 0;
  isDisabled: boolean = true;
  analyzeSelectedNode: number = 0;

  // file upload 
  selectedFiles: FileList | undefined;
  currentFile: File | undefined;
  progress = 0;
  message = '';
  finalResult: any[] = [];

  constructor(
    private pairwiseService: PairwiseService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.getAllNodes();
  }

  getAllNodes(): void {
    this.nodes = [];

    this.pairwiseService.getListOfNodes().subscribe((data) => {
      data._embedded.node.forEach(element => {
        this.nodes.push(new Node(element.id, element.nodeName, element.parentNodeId, element.value, element.children));
      });

      this.addNodeNameParent = this.nodes[0].id;
      this.deleteNodeName = this.nodes[0].id;
      this.renameParentNodeId = this.nodes[0].id;

      if (this.nodes.length >= 4) {
        this.isDisabled = false;
      } else if (this.nodes.length < 4) {
        this.isDisabled = true;
      }
    }, (err: any) => {
      this.toast.show('Error', err.error);
    });
  }

  addNode(): void {
    let node = new Node();
    node.nodeName = this.nodeNameInput;
    node.parentNodeId = this.addNodeNameParent;

    this.pairwiseService.addNode(node).subscribe((res) => {
      this.nodes = res;
    }, (err: any) => {
      this.toast.show('Error', err.error);
    });

    this.nodeNameInput = '';
  }

  deleteNode(): void {
    let nodeIdToDelete = this.deleteNodeName;

    this.pairwiseService.deleteNode(nodeIdToDelete).subscribe((res) => {
      this.nodes = res;
    }, 
    (err: any) => {
      this.toast.show('Node Deletion Failed!', err.error);
    })

    this.getAllNodes();
  }

  updateNode(): void {
    let node = new Node();
    node.id = this.renameParentNodeId;
    node.nodeName = this.updateNameOfNode;

    this.pairwiseService.updateNode(node).subscribe((res) => {
      this.nodes = res;
    }, (err: any) => {
      this.toast.show('Error', err.error);
    });

    this.updateNameOfNode = '';
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles?.item(0) as File;
    
    this.pairwiseService.upload(this.currentFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event?.loaded / event?.total);
        } else if (event instanceof HttpResponse) {
          this.finalResult = event.body;
          if (event.statusText === 'OK') {
            this.message = 'File Uploaded successfully';
          }
        }
      },
      err => {
        if (err.statusText === 'Bad Gateway') {
          this.message = err.body;
          this.progress = 0;
          this.currentFile = undefined;
        }else{
        this.progress = 0;
        this.message = 'File Format is not correct';
        this.currentFile = undefined;
        }
      });

    this.selectedFiles = undefined;
  }

  closeToast() {
    this.toast.close();
  }

  onChangeAnalyzeNode(e: any) {
    console.log(e.target.value);
    this.analyzeSelectedNode = e.target.value;
  }

  analyze() {
    this.pairwiseService.analyze(this.analyzeSelectedNode).subscribe((data) => {
      console.log(data);
    },(error) => {
      console.log(error.error);
      
      this.toast.show('Error', error.error);
    })
  }

}
