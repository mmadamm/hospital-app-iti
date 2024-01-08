import { Component, OnInit } from '@angular/core';
import { GetAllSpecializationsService } from '../services/getAllSpecializations.service';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { FormControl, FormGroup } from '@angular/forms';
import { AddSpecializationService } from '../services/addSpecialization.service';

@Component({
  selector: 'app-specializtion',
  templateUrl: './specializtion.component.html',
  styleUrls: ['./specializtion.component.css']
})
export class SpecializtionComponent implements OnInit {
  specializations:any;
  name: string = '';
  id: number = 0;
  spec :string = '';
  isInputEmpty: boolean = true;

  constructor(private getAllSpecializationsService : GetAllSpecializationsService , private addSpecialization : AddSpecializationService){}
ngOnInit(): void {
  this.getAllSpecializationsService.getAllSpecializations().subscribe({
    next : (specializations:GetAllSpecializationsDto)  => {
      console.log(specializations);
      this.specializations = specializations;
      this.name = specializations.name!;
      this.id = specializations.id!;
    },
    error :(error) => {
      console.error(error);
    }
  })
}

form = new FormGroup({
  specName : new FormControl<string>('')
})



onSubmit(e: Event) {
  e.preventDefault();
  this.spec = this.form.controls.specName.value!;
  this.addSpecialization.addSpecialization(this.spec).subscribe(
    (response) => {
      console.log('Specialization added successfully');
      console.log(this.spec);

      this.form.reset();
      this.isInputEmpty = true;

      this.getAllSpecializationsService.getAllSpecializations().subscribe({
        next: (specializations: GetAllSpecializationsDto) => {
          console.log(specializations);
          this.specializations = specializations;
        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    (error) => {
      console.error('Error adding specialization:', error);
    }
  );

  }

  onInputChange() {
    this.isInputEmpty = this.form.controls.specName.value?.trim() === '';
  }

}

