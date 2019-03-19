import Selectable from '../../src/';

describe('Test React Selectable Simple', function() {

	beforeEach("turn selection mode on", function() {
		cy.visit("http://localhost:3001");
  		cy.get(".toggleButton").click();
	});

  it('should change cursor style when select mode is toggled', function() {
  	cy.get(".Selectable").trigger("mouseover").should(container => {
  		console.log(container);
  		expect(container[0].style.cursor).to.equal("crosshair");
  	});

  	cy.get(".toggleButton").click();
  	cy.get(".Selectable").trigger("mouseover").should(container => {
  		expect(container[0].style.cursor).to.equal("auto");
  	});
  });

  it ('should draw dimensions of box based on initial and ending mouse position', function() {
  	cy.get(".Selectable")
  		.trigger("mousedown", 15, 15)
  		.trigger("mousemove", 200, 200, {force: true})
  		.trigger("mouseup");
  	
  	cy.get(".Selectable__selection-box").should(el => {
  		expect(el[0].style.height).to.equal("185px");
  		expect(el[0].style.width).to.equal("185px");
  	});
  });

  it ('should select the items that are entirely within the resulting selection box', function() {
  	let x1 = 15, y1 = 15, x2 = 50, y2 = 50, firstLiOffsetTop = 0, liHeight = 0;

	cy.get("ul > li:first").then(($el) => {
		firstLiOffsetTop = $el[0].offsetTop; // 16
		liHeight = $el[0].offsetHeight; // 18
	});
  	cy.get(".Selectable")
  		.trigger("mousedown", x1, y1)
  		.trigger("mousemove", x2, y2, {force: true})
  		.trigger("mouseup");
  	
  	cy.get(".Selectable__selection-box").should(el => {
  		expect(el[0].style.height).to.equal(y2 - y1 + "px");
  		expect(el[0].style.width).to.equal(x2 - x1 + "px");
  	});

  	cy.get("ul > li").then(($arr) => {
  		let liPositions = [];
  		Array.from($arr).forEach(el => {
  			let obj = {};
  			obj.top = el.offsetTop;
  			obj.bottom = el.offsetTop + el.offsetHeight;
  			liPositions.push(obj);
  		});
  		let liPosition;
  		let selected = [];
  		for (liPosition of liPositions) {
			if (liPosition.top > y1 && liPosition.bottom < y2) {
				selected.push(liPosition);
			}
		}
  		expect(selected.length).to.equal(1);
  	});
  });

});