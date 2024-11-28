export function getContentSection(): HTMLElement {
    const contentSec = document.getElementById('content');
    if (!contentSec) throw new Error('The app is not mounted properly. Cannot find the #content section');
    return contentSec;
}
export function resetHtml(){
    const contentHtml = getContentSection()
    contentHtml.replaceChildren();
}


export function renderLoadingScreen(on: boolean) {
    const contentSec = getContentSection();
    if (on) {
        const loadingscreen = `
        <section id="loading-screen">
    <h1>Loading...</h1>
        </section>
      `
        contentSec.innerHTML = contentSec.innerHTML + loadingscreen;
    }
    else {
        const loadingscreen = document.getElementById('loading-screen');
        loadingscreen?.parentElement?.removeChild(loadingscreen);
    }
}