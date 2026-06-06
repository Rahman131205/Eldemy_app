import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialDetailPage } from './material-detail.page';

describe('MaterialDetailPage', () => {
  let component: MaterialDetailPage;
  let fixture: ComponentFixture<MaterialDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
