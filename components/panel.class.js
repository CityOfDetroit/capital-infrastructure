'use strict';
export default class Panel {
    constructor(container){
        this.container = container;
    }

    buildPanel(data){
        this.container.innerHTML = this.buildMarkUp(data);
    }

    clearPanel(){
        this.container.innerHTML = '';
    }

    buildMarkUp(data){
        let html = `
            ${data.properties.PRNAME !== undefined ? `<h5>${data.properties.PRNAME}</h5>` : `` }
            ${data.properties.Primary_St !== undefined ? `<h5>${data.properties.Primary_St}</h5>` : `` }
            <section class="group">
            <span class="header">Details</span>
            <p><strong>Creator:</strong> ${data.properties.Creator}</p>
            <p><strong>Start:</strong> ${data.properties.Projected_Start_Date}</p>
            <p><strong>End:</strong> ${data.properties.Projected_End_Date}</p>
            </section>
            <section class="group">
            <span class="header">Learn more</span>
            <article class="sub-group">
                <a class="btn resource" href="/taxonomy/term/5441" target="_blank">Get Involved</a>
            </article>
            </section>
            <p><small>Some small print and disclaimer.</small></p>
        `;
        
        return html;
    }
}