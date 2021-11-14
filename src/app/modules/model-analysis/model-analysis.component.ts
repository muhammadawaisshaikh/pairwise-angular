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

  addNodeNameParent: number = 0;
  deleteNodeName: number = 0;
  renameParentNodeId: number = 0;

  error: any;

  constructor(
    private pairwiseService: PairwiseService,
  ) { }

  ngOnInit(): void {
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

}
