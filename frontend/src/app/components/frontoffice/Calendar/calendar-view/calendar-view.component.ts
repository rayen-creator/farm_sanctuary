import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Calendar, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event, eventType } from 'src/app/core/models/event';
import { EventService } from 'src/app/core/services/event.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { EventDropArg } from '@fullcalendar/core';




@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
})
export class CalendarViewComponent implements OnInit {
  events: Event[] = [];
  calendar: Calendar;
  modal: any; // declare the modal property

  calendarOptions: any;
  currentEvents: EventInput[] = [];

  constructor(
    private eventService: EventService,
    private changeDetector: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events.map((event) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          start: event.start,
          end: event.end,
          type: event.type,
        };
      });

      const calendarEl = document.getElementById('calendar');
      if (calendarEl) {
        const calendarOptions = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          //the month, day and week display
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },

          initialView: 'dayGridMonth',
          events: this.events,
          editable: true,
          selectable: true, // enable user to select a time slot
          select: this.handleDateSelect.bind(this), //add an event
          eventClick: this.handleEventClick.bind(this), // delete choice
          eventDidMount: this.setEventBackgroundColor.bind(this),// color of the eventType
          eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),


        };
        this.currentEvents = this.events;
        this.calendar = new Calendar(calendarEl, calendarOptions);
        this.calendar.render();
      } else {
        console.error('Calendar element not found');
      }
    });
  }

  //add an event :)

  handleDateSelect(arg: { startStr: any; endStr: any }) {
    const title = prompt('Enter event title:');
    const type = prompt('Enter event type (PLANTING, HARVESTING, etc.):');
    if (title && type) {
      const newEvent: Event = {
        id: '',
        title,
        description: '',
        start: arg.startStr,
        end: arg.endStr,
        type: type as eventType,
      };
      this.events.push(newEvent);
      this.eventService.createEvent(newEvent);
      this.calendar.addEvent(newEvent);
      this.currentEvents = this.events;
      this.changeDetector.detectChanges();

      this.toastr.success('Event  added successfully', 'Success', {
        progressBar: true,
      });
    }
    this.calendar.unselect();
  }

  //delete an event

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const eventId = clickInfo.event.id;
      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.calendar.getEventById(eventId)?.remove(); // remove event from FullCalendar

        this.toastr.success('Event deleted successfully', 'Success', {
          progressBar: true,
        });
      });
    }
  }
  //changing the background color of the event based on the type of event
  setEventBackgroundColor(info: any) {
    console.log(
      'renderEvent called with event type:',
      info.event.extendedProps.type
    );

    const eventType = info.event.extendedProps.type;
    switch (eventType) {
      case 'PLANTING':
        info.el.style.backgroundColor = 'blue';
        break;
      case 'HARVESTING':
        info.el.style.backgroundColor = 'green';
        break;
      case 'FERTILISER_APPLICATION':
        info.el.style.backgroundColor = 'yellow';
        break;
      case 'LIVESTOCK_CARE':
        info.el.style.backgroundColor = 'purple';
        break;
      case 'PEST_CONTROL':
        info.el.style.backgroundColor = 'orange';
        break;
      case 'IRRIGATION':
        info.el.style.backgroundColor = 'pink';
        break;
      case 'CROP_ROTATION':
        info.el.style.backgroundColor = 'brown';
        break;
      default:
        info.el.style.backgroundColor = 'gray';
        break;
    }
  }
  handleEventDrop(arg: EventDropArg) {
    const updatedEvent = {
      id: arg.event.id,
      title: arg.event.title,
      description: arg.event.extendedProps.description,
      start: arg.event.start ? arg.event.start.toISOString() : '',
      end: arg.event.end ? arg.event.end.toISOString() : '',
      type: arg.event.extendedProps.type,
    };
  
    this.eventService.updateEvent(updatedEvent.id, updatedEvent).subscribe(
      (updated) => {
        // update the event in the FullCalendar instance
        arg.event.setDates(updated.start, updated.end);
        this.toastr.success('Event updated successfully', 'Success', {
          progressBar: true,
        });
      },
      (error) => {
        console.log(error);
       
      }
    );
  }
  


  
}
