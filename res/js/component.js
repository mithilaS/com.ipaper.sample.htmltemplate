sap.designstudio.sdk.Component.subclass("com.ipaper.sample.htmltemplate.HTMLTemplate", function() {
    
	this._HTML = "Hi";
    this._terms = new Array(100);
    this._replacements = new Array(100);
    this._afterInit = null;
    
    this.parseTerm = function(t,i){
    	this._terms[i] = t;
    };
    this.parseReplacement = function(r,i){
    	this._replacements[i] = r;
    };    
	
    for(var i=1;i<=100;i++){
    	this["term"+i] = function(i){
    		return function(t){
    			this.parseTerm(t,i-1);
    			return this;
    		};
    	}(i);
    	this["replacement"+i] = function(i){
    		return function(t){
    			this.parseReplacement(t,i-1);
    			return this;
    		};
    	}(i);
    }
	this.HTML = function(h){
    	this._HTML = h;
		return this;
    };
    
    this.afterInit = function(s){
    	if(s!=undefined){
    		this._afterInit = s;
    	}
    	return this;
    };
    this.rerender = function(){
    	var rHTML = this._HTML;
    	var rJS = this._afterInit;
    	for(var i=0;i<this._terms.length;i++){
    		if(this._terms[i]){
    			rHTML = rHTML.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    			rJS = rJS.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    		}
    	}
    	this.$().html(rHTML);
    	try{
			eval(rJS);
		}catch(e){
			alert(e);
		}
    };
    
    this.afterUpdate = function(){
    	this.rerender();
    };
    
	this.init = function() {
		this.rerender();
	};
});