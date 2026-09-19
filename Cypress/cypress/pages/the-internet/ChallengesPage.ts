import { BasePage } from './BasePage';

export class ChallengesPage extends BasePage {
  private hoverMenu = '#hovers';
  private userMenu = '#user-menu';
  private dragSource = '#drag-source';
  private dragTarget = '#drag-target';

  hoverOverUserMenu() {
    cy.get(this.hoverMenu).realHover();
    cy.get(this.userMenu).should('be.visible');
  }

  complexDragAndDrop() {
    cy.get(this.dragSource).drag(this.dragTarget);
  }
}
