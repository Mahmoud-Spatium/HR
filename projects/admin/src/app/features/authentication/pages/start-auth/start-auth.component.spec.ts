/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartAuthComponent } from './start-auth.component';

describe('StartAuthComponent', () => {
  let component: StartAuthComponent;
  let fixture: ComponentFixture<StartAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
