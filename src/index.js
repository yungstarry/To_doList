import dom from './dom';
import handlers from './handlers';

dom.showMainTitle(0);

dom.showProjects();

dom.getTasks('all');

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();