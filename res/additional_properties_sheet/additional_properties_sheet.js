sap.designstudio.sdk.PropertyPage.subclass("com.sap.sample.ipaper.htmltemplate.HTMLPropertyPage",  function() {

	var that = this;
	this.htmlEditor = null;
	
	this.init = function() {
		// HTML Editor
		this.htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlValue"), {
			lineNumbers: true,
			mode: "text/html",
			theme: "eclipse",
			matchBrackets: true
		});
		this.htmlEditor.on("change",function(cMirror){
			$("#htmlValue").val(cMirror.getValue());
		});
		// JS Editor
		this.jsEditor = CodeMirror.fromTextArea(document.getElementById("afterInitValue"), {
			lineNumbers: true,
			mode: "text/javascript",
			theme: "eclipse",
			matchBrackets: true
		});
		this.jsEditor.on("change",function(cMirror){
			$("#afterInitValue").val(cMirror.getValue());
		});
		// Form Submission Event Listener
		$("#form").submit(function() {
			that.firePropertiesChanged(["HTML"]);
			return false;
		});
		$("#form").submit(function() {
			that.firePropertiesChanged(["afterInit"]);
			return false;
		});
	};
	
	this.afterInit = function(value){
		if( value === undefined){
			return $("#afterInitValue").val();
		}else{
			$("#afterInitValue").val(value);
			this.jsEditor.setValue(value);
			return this;
		}
	};
	
	this.HTML = function(value) {
		if (value === undefined) {
			return $("#htmlValue").val();
		}else{
			$("#htmlValue").val(value);
			this.htmlEditor.setValue(value);
			return this;
		}
	};
});