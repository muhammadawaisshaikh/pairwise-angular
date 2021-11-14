import { Component, OnInit } from '@angular/core';
import { Node } from 'src/app/common/node/node';
import { PairwiseService } from 'src/app/services/pairwise/pairwise.service';

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

  error: any;

  isDisabled: boolean = true;

  constructor(
    private pairwiseService: PairwiseService,
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
    }, (err: any) => this.error = err.error);
    // this.reloadPageIfNoError();
  }

  addNode(): void {
    let node = new Node();
    node.nodeName = this.nodeNameInput;
    node.parentNodeId = this.addNodeNameParent;

    console.log('NodeName >>>>>', this.nodeNameInput);

    this.pairwiseService.addNode(node).subscribe((res) => {
      this.nodes = res;
    }, (err: any) => {
      this.error = err.error;
      console.log('Error >>>>>', err.error);
    });

    this.nodeNameInput = '';
    // this.getAllNodes();
  }

  deleteNode(): void {
    let nodeIdToDelete = this.deleteNodeName;

    this.pairwiseService.deleteNode(nodeIdToDelete).subscribe((res) => {
      this.nodes = res;
    }, (err: any) => this.error = err.error);

    this.getAllNodes();
   // this.reloadPageIfNoError();
  }

  updateNode(): void {
    let node = new Node();
    node.id = this.renameParentNodeId;
    node.nodeName = this.updateNameOfNode;

    this.pairwiseService.updateNode(node).subscribe((res) => {
      this.nodes = res;
    }, (err: any) => this.error = err.error);

    this.updateNameOfNode = '';
    this.getAllNodes();
    //this.reloadPageIfNoError();
  }

  reloadPageIfNoError(): void {
    this.nodes = [];
    if (this.error === null) {
      window.location.reload();
    }
  }

}
