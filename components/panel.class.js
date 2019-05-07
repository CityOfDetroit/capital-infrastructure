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
            ${data.properties.Project_Type !== undefined ? `<p><strong>Project Type:</strong> ${data.properties.Project_Type}</p>` : `<p><strong>Project Type:</strong> Streetscape</p>` }
            ${data.properties.Jurisdiction !== undefined ? `<p><strong>Jurisdiction:</strong> ${data.properties.Jurisdiction}</p>` : `<p><strong>Jurisdiction:</strong> ${data.properties.RoadOwners}</p>` }
            ${data.properties.Phase !== undefined ? `<p><strong>Phase:</strong> ${data.properties.Phase}</p>` : `` }
            ${data.properties.Planned_Year !== undefined ? `<p><strong>Planned Year:</strong> ${data.properties.Planned_Year}</p>` : `` }
            ${data.properties.Start_date !== undefined ? `<p><strong>Planned Year:</strong> ${data.properties.Start_date.split('/')[2]}</p>` : `` }
            </section>
            <section class="group">
            <span class="header">Learn more</span>
            <article class="sub-group">
                <a class="btn resource" href="/taxonomy/term/5441" target="_blank">Get More Information</a>
            </article>
            </section>
            <p><small>Some small print and disclaimer.</small></p>
        `;
        
        return html;
    }
}