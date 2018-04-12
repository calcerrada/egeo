/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { DebugElement, SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { cloneDeep as _cloneDeep } from 'lodash';


import { StTreeComponent } from './st-tree.component';
import { StTreeNode, StTreeEvent } from './st-tree.model';

const mockTree: StTreeNode = {
   name: 'hdfs',
   icon: 'icon-folder',
   expanded: true,
   children: [
      { name: 'folder A', icon: 'icon-folder' },
      {
         name: 'folder B', icon: 'icon-folder', expanded: true, children: [
            {
               name: 'folder B.0', icon: 'icon-folder', children: [
                  { name: 'folder B.0.0', icon: 'icon-file' },
                  { name: 'folder B.0.1', icon: 'icon-file' }
               ]
            },
            {
               name: 'folder B.1', icon: 'icon-folder', expanded: true, children: [
                  { name: 'folder B.1.0', icon: 'icon-file' },
                  { name: 'folder B.1.1', icon: 'icon-file' }
               ]
            },
            { name: 'folder B.2', icon: 'icon-file' },
            { name: 'folder B.3', icon: 'icon-file' },
            {
               name: 'folder B.4', icon: 'icon-folder', expanded: true, children: [
                  { name: 'folder B.4.0', icon: 'icon-file' },
                  { name: 'folder B.4.1', icon: 'icon-file' },
                  { name: 'folder B.4.2', icon: 'icon-file' },
                  { name: 'folder B.4.3', icon: 'icon-file' },
                  { name: 'folder B.4.4', icon: 'icon-file' }
               ]
            }
         ]
      },
      { name: 'folder C', icon: 'icon-file' },
      { name: 'folder D', icon: 'icon-folder' }
   ]
};

let fixture: ComponentFixture<StTreeComponent>;

describe('StTreeComponent', () => {

   let comp: StTreeComponent;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StTreeComponent, StTreeComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTreeComponent);
      comp = fixture.componentInstance;
   });


   it('should init correctly', () => {
      comp.tree = mockTree;
      fixture.detectChanges();

      expect(comp.path).toEqual([]);

      // Tree and mockTree are the same, internalTree its equal but not the same
      expect(comp.tree).toEqual(mockTree);
   });

   it('should change tree structure and reflect change', () => {
      comp.tree = mockTree;
      fixture.detectChanges();

      expect((comp as any)._tree).toEqual(mockTree);
      expect(comp.node).toEqual(mockTree);

      let newTree: StTreeNode = { name: 'hdfs', icon: 'icon-folder' };
      comp.tree = newTree;

      expect((comp as any)._tree).toEqual(newTree);
      expect(comp.node).toEqual(newTree);
   });


   it('should collapse node without children and collapseChildrenBranch true', () => {
      let node: StTreeNode = { name: 'name', icon: '' };
      comp.collapseChildrenBranch = true;
      comp.tree = { name: 'root', icon: '', children: [node] };
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toggleNode.subscribe(responseFunction);
      let nodeToSend: StTreeNode = (comp as any)._tree.children[0];
      nodeToSend.expanded = false;
      let change: StTreeEvent = { node: nodeToSend, target: [0] };

      comp.onToggleNode(change);

      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toggleNode.unsubscribe();
   });

   it('should collapse node with children collapsed and collapseChildrenBranch true', () => {
      let node: StTreeNode = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildrenBranch = true;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toggleNode.subscribe(responseFunction);
      let nodeToSend: StTreeNode = (comp as any)._tree.children[0];
      nodeToSend.expanded = false;
      let change: StTreeEvent = { node: nodeToSend, target: [0] };

      comp.onToggleNode(change);

      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toggleNode.unsubscribe();
   });

   it('should collapse node without children and collapseChildrenBranch false', () => {
      let node: StTreeNode = { name: 'name', icon: '' };
      comp.collapseChildrenBranch = false;
      comp.tree = { name: 'root', icon: '', children: [node] };
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toggleNode.subscribe(responseFunction);
      let nodeToSend: StTreeNode = (comp as any)._tree.children[0];
      nodeToSend.expanded = false;
      let change: StTreeEvent = { node: nodeToSend, target: [0] };

      comp.onToggleNode(change);

      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toggleNode.unsubscribe();
   });

   it('should collapse node with children collapsed and collapseChildrenBranch false', () => {
      let node: StTreeNode = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toggleNode.subscribe(responseFunction);
      let nodeToSend: StTreeNode = (comp as any)._tree.children[0];
      nodeToSend.expanded = false;
      let change: StTreeEvent = { node: nodeToSend, target: [0] };

      comp.onToggleNode(change);

      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toggleNode.unsubscribe();
   });

   it('should collapse node with children expanded and collapseChildrenBranch false', () => {
      let node: StTreeNode = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '', expanded: true }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toggleNode.subscribe(responseFunction);
      let nodeToSend: StTreeNode = (comp as any)._tree.children[0];
      nodeToSend.expanded = false;
      let change: StTreeEvent = { node: nodeToSend, target: [0] };

      comp.onToggleNode(change);

      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect((comp as any)._tree.children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toggleNode.unsubscribe();
   });

   it('should expand father nodes when its the root node with expandFatherBranch true', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StTreeNode = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.toggleNode.subscribe(responseFunction);
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      expect((comp as any)._tree.expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(0);
   });

   it('should expand father nodes when its a deep node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StTreeNode = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '', expanded: true }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toggleNode.subscribe(responseFunction);
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      expect((comp as any)._tree.expanded).toBeFalsy();
      expect((comp as any)._tree.children[0].expanded).toBeFalsy();
      expect((comp as any)._tree.children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
   });

   it('should expand father nodes when its a child of root node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StTreeNode = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toggleNode.subscribe(responseFunction);
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      expect((comp as any)._tree.expanded).toBeFalsy();
      expect((comp as any)._tree.children[0].expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();

   });

   it('should expand father nodes when its the root node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StTreeNode = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.toggleNode.subscribe(responseFunction);
      comp.collapseChildrenBranch = false;
      fixture.detectChanges();

      expect((comp as any)._tree.expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
   });
});
