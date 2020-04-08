import { Subject } from 'rxjs';
import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById('loading-overlay');

loadingService.loadingStatus$.subscribe((isLoading) => {
  if (isLoading) {
    //loadingOverlay.classList.add('open');
    console.log('open');
  } else {
    //loadingOverlay.classList.remove('open');
    console.log('remove');
  }
});

// problem is that we have to call showLoading explicity during the start of app but we can do better with a BehaviourSubject
// loadingService.showLoading();

setTimeout(() => {
  loadingService.hideLoading();
}, 3000);
