import Component from "./Component.js";
import Project from "./Project.js";
import { autobind } from "./shared/decorators.js";
import { Draggable } from "./shared/types.js";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get personsNumber() {
    if (this.project.people === 1) {
      return '1 person';
    }
    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure()
    this.renderContent()
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  @autobind
  dragEndHandler(_: DragEvent) {

  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.personsNumber + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

export default ProjectItem