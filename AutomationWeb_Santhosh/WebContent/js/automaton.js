
$( document ).ready(function() {
	 var chart;
	 var stepDescription = ["st=>start","e=>end: End"];
	 var steps =[];
	 var stepCount =1 ;
	 
	 $("#soap-form").hide();
	 $("#rest-form").hide();
	 $("#shell-form").hide();
	 $("#database-form").hide();
	 $("#conf-tab").hide();
	 $("#exec-tab").hide();
	 $("#conf-canvas").hide();
	 $("#exec-canvas").hide();
	 $("#venus-copy").hide();
	 
	 $("#automaton,#home-menu").click(function(event) {
		 $("#conf-tab").hide();
		 $("#exec-tab").hide();
		 $("header").show();
	 });
	 
	 $("#conf-menu,#create-wf-btn").click(function(event) {
		 $("header").hide();
		 $("#exec-tab").hide();
		 $("#conf-tab").show();
		 $("#steps").show();
		 $("#input-form").hide();
		 $("#soap-form").hide();
		 $("#rest-form").hide();
		 $("#shell-form").hide();
		 $("#database-form").hide();
		 clear_form();
	 });
	 
	 $("#exec-menu").click(function(event) {
		 $("header").hide();
		 $("#conf-tab").hide();
		 $("#exec-tab").show();
		 clear_form();
	 });

	 $("#database").click(function(event) {
		if(!is_workflow_name_empty())
			exit;
		$("#steps").hide();
		$("#soap-form").hide();
		$("#rest-form").hide();
		$("#shell-form").hide();
		$(".field-error").hide();
		$("#database-form").show();
		$("#input-form").show();
		$("#conf-canvas").hide();
		clear_form();
	 });
	
	 $("#soap").click(function(event) {
		if(!is_workflow_name_empty())
			exit;
		$("#steps").hide();
		$("#database-form").hide();
		$("#soap-form").show();
		$("#rest-form").hide();
		$("#shell-form").hide();
		$("#input-form").show();
		$("#conf-canvas").hide();
		clear_form();
	 });
	
	 $("#rest").click(function(event) {
		if(!is_workflow_name_empty())
			exit;
		$("#steps").hide();
		$("#database-form").hide();
		$("#soap-form").hide();
		$("#rest-form").show();
		$("#shell-form").hide();
		$("#input-form").show();
		$("#conf-canvas").hide();
		clear_form();
	 });
	
	 $("#shell").click(function(event) {
		if(!is_workflow_name_empty())
			exit;
		$("#steps").hide();
		$("#database-form").hide();
		$("#soap-form").hide();
		$("#rest-form").hide();
		$("#shell-form").show();
		$("#input-form").show();
		$("#conf-canvas").hide();
		clear_form();
	 });
	 
	 // Common functions
	 function clear_form()
	 {
	     $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
	     $(':checkbox, :radio').prop('checked', false);
	 }
	 
	 function on_hover_error(field, error) {
		if($(field).hasClass("invalid")) {
				$(field).attr('title', error);
		}
	 }
	 
	 $("#wf-search-btn,#wf-exec-btn,#wf-result-btn").click(function(event) {
		 var workflow_name = $("#wf-exec-name").val();
		 if(jQuery.trim(workflow_name).length > 0) {
			$("#wf-exec-name").removeClass("invalid").addClass("valid");
		} else {
			$("#wf-exec-name").removeClass("valid").addClass("invalid");
		} 
	 });
	 
	 
	 function is_workflow_name_empty() {
		var workflow_name = $("#wf-name").val();
		if(jQuery.trim(workflow_name).length > 0) {
			$("#wf-name").removeClass("invalid").addClass("valid");
			return true;
		} else {
			$("#wf-name").removeClass("valid").addClass("invalid");
			return false;
		} 
	 }
	 
	 function is_field_empty(field) {
		empty = false; 	
		$(field).each(function() {
		    if ($.trim($(this).val()) <= 0) {
		    	$(this).removeClass("valid").addClass("invalid");
		    	empty = true;
		    } 
		});
			
		if (empty) {
			return true;
		} else {
			return false;
		}
	}

	 
	 // Workflow page functions
	 $('#workflow-name').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#wf-name").removeClass("invalid").addClass("valid");}
		else{$("#wf-name").removeClass("valid").addClass("invalid");}
	});
	
	$("#wf-cancel-btn").click(function(event) {
		$(".list-group").hide();
		$("#conf-tab").show();
		$("#wf-name").removeClass("invalid").addClass("valid");
		chart.clean();
	});
	
	// Save workflow
	$("#wf-save-btn").click(function(event) {
		var workflow_name = $("#wf-name").val();
		if(jQuery.trim(workflow_name).length > 0) {
			$("#wf-name-error").hide();
			alert("Workflow "+workflow_name+" saved");
			$("#wf-name").removeClass("invalid").addClass("valid");
			$("#venus-copy").show();
		} else {
			$("#wf-name").removeClass("valid").addClass("invalid");
		} 
	});
	
	$("#wf-name").on('mouseover', function(){
		on_hover_error("#wf-name", 'Please enter workflow name');
	 });
 
	// Database form functions	
	$("#db-step-name").on('mouseover', function(){
		on_hover_error("#db-step-name", 'Please name the database operation');
	 });
	
	$('#db-step-name').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-name").removeClass("invalid").addClass("valid");}
		else{$("#db-step-name").removeClass("valid").addClass("invalid");}
	});
	
	$("#db-step-type").on('mouseover', function(){
		on_hover_error("#db-step-type", 'Please select database type');
	 });
	
	$('#db-step-type').on('select', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-type").removeClass("invalid").addClass("valid");}
		else{$("#db-step-type").removeClass("valid").addClass("invalid");}
	});
	
	$("#db-step-conn-str").on('mouseover', function(){
		on_hover_error("#db-step-conn-str", 'Please provide database connection string');
	 });
	
	$('#db-step-conn-str').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-conn-str").removeClass("invalid").addClass("valid");}
		else{$("#db-step-conn-str").removeClass("valid").addClass("invalid");}
	});
	
	$("#db-step-username").on('mouseover', function(){
		on_hover_error("#db-step-username", 'Please provide database username');
	 });

	$('#db-step-username').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-username").removeClass("invalid").addClass("valid");}
		else{$("#db-step-username").removeClass("valid").addClass("invalid");}
	});
	
	$("#db-step-pwd").on('mouseover', function(){
		on_hover_error("#db-step-pwd", 'Please provide database pwd');
	 });
	
	$('#db-step-pwd').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-pwd").removeClass("invalid").addClass("valid");}
		else{$("#db-step-pwd").removeClass("valid").addClass("invalid");}
	});
	
	$("#db-step-query").on('mouseover', function(){
		on_hover_error("#db-step-query", 'Please provide query');
	 });

	$('#db-step-query').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#db-step-query").removeClass("invalid").addClass("valid");}
		else{$("#db-step-query").removeClass("valid").addClass("invalid");}
	});
	
	// DB step save button click
	$("#db-save-btn").click(function( event ) {
		if(!is_field_empty(".db-step-field")) {
			var step_name = $("#db-step-name").val();
			$("#db-step-name").val('');
			$("#database-form").hide();
			$("#steps").show();
			$(".list-group").append("<a href=\"#\" id=\"db-step-btn\"class=\"list-group-item list-group-item-success btn btn-primary btn-xl\">"+step_name+"</a>");
			$("#input-form").hide();
			$("#conf-canvas").show();
			addStep(stepCount,step_name, "conf-canvas");
		} 
    });
	
	// DB step cancel button click
	$("#db-cancel-btn").click(function( event ) {
		clear_form();
    });

	// SOAP form functions
	$("#soap-step-name").on('mouseover', function(){
		on_hover_error("#soap-step-name", 'Please name the SOAP operation');
	});
	
	$('#soap-step-name').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#soap-step-name").removeClass("invalid").addClass("valid");}
		else{$("#soap-step-name").removeClass("valid").addClass("invalid");}
	});
	
	$("#soap-step-url").on('mouseover', function(){
		on_hover_error("#soap-step-url", 'Please provide SOAP URL');
	});
	
	$('#soap-step-url').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#soap-step-url").removeClass("invalid").addClass("valid");}
		else{$("#soap-step-url").removeClass("valid").addClass("invalid");}
	});

	$("#soap-step-xml").on('mouseover', function(){
		on_hover_error("#soap-step-xml", 'Please provide SOAP XML request');
	});
	
	$('#soap-step-xml').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#soap-step-xml").removeClass("invalid").addClass("valid");}
		else{$("#soap-step-xml").removeClass("valid").addClass("invalid");}
	});
	
	// SOAP step save btn click
	$("#soap-save-btn").click(function( event ) {
		if(!is_field_empty(".soap-step-field")) {
	 		var step_name = $("#soap-step-name").val();
			$("#soap-step-name").val('');
			$("#soap-form").hide();
			$("#steps").show();
			$(".list-group").append("<a href=\"#\" id=\"soap-step-btn\"class=\"list-group-item list-group-item-success btn btn-success\">"+step_name+"</a>");
			$("#input-form").hide();
			$("#conf-canvas").show();
	 		addStep(stepCount,step_name, "conf-canvas");
		}
    });
	
	$("#soap-cancel-btn").click(function( event ) {
		clear_form();
    });

	// REST form functions
	$("#rest-step-name").on('mouseover', function(){
		on_hover_error("#rest-step-name", 'Please name the REST operation');
	});
	
	$('#rest-step-name').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#rest-step-name").removeClass("invalid").addClass("valid");}
		else{$("#rest-step-name").removeClass("valid").addClass("invalid");}
	});
	
	$("#rest-step-url").on('mouseover', function(){
		on_hover_error("#rest-step-url", 'Please provide REST URL');
	});
	
	$('#rest-step-url').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#rest-step-url").removeClass("invalid").addClass("valid");}
		else{$("#rest-step-url").removeClass("valid").addClass("invalid");}
	});
	
	$("#rest-step-json").on('mouseover', function(){
		on_hover_error("#rest-step-json", 'Please provide REST json');
	});
	
	$('#rest-step-json').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#rest-step-json").removeClass("invalid").addClass("valid");}
		else{$("#rest-step-json").removeClass("valid").addClass("invalid");}
	});
	
	// REST step save button click
	$("#rest-save-btn").click(function( event ) {
		if(!is_field_empty(".rest-step-field")) {
	 		var step_name = $("#rest-step-name").val();
			$("#rest-step-name").val('');
			$("#rest-form").hide();
			$("#steps").show();
			$(".list-group").append("<a href=\"#\" id=\"rest-step-btn\"class=\"list-group-item list-group-item-success btn btn-info\">"+step_name+"</a>");
			$("#input-form").hide();
			$("#conf-canvas").show();
	 		addStep(stepCount,step_name, "conf-canvas");
		}
    });

	$("#rest-cancel-btn").click(function( event ) {
		clear_form();
    });
	
	// SHELL form functions
	$("#shell-step-name").on('mouseover', function(){
		on_hover_error("#shell-step-name", 'Please name the shell script operation');
	});
	
	$('#shell-step-name').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#shell-step-name").removeClass("invalid").addClass("valid");}
		else{$("#shell-step-name").removeClass("valid").addClass("invalid");}
	});
	
	$("#shell-step-host").on('mouseover', function(){
		on_hover_error("#shell-step-host", 'Please provide shell script hostname');
	});
	
	$('#shell-step-host').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#shell-step-host").removeClass("invalid").addClass("valid");}
		else{$("#shell-step-host").removeClass("valid").addClass("invalid");}
	});
	
	$("#shell-step-username").on('mouseover', function(){
		on_hover_error("#shell-step-username", 'Please provide the shell script username');
	});
	
	$('#shell-step-username').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#shell-step-username").removeClass("invalid").addClass("valid");}
		else{$("#shell-step-username").removeClass("valid").addClass("invalid");}
	});
	
	$("#shell-step-pwd").on('mouseover', function(){
		on_hover_error("#shell-step-pwd", 'Please provide the shell script password');
	});
	
	$('#shell-step-pwd').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#shell-step-pwd").removeClass("invalid").addClass("valid");}
		else{$("#shell-step-pwd").removeClass("valid").addClass("invalid");}
	});
	
	$("#shell-step-script").on('mouseover', function(){
		on_hover_error("#shell-step-script", 'Please provide the shell script name (full path)');
	});
	
	$('#shell-step-script').on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name){$("#shell-step-script").removeClass("invalid").addClass("valid");}
		else{$("#shell-step-script").removeClass("valid").addClass("invalid");}
	});
	
	// Shell step save button
 	$("#shell-save-btn").click(function( event ) {
 		if(!is_field_empty(".shell-step-field")) {
	 		var step_name = $("#shell-step-name").val();
			$("#shell-step-name").val('');
			$("#shell-form").hide();
			$("#steps").show();
			$(".list-group").append("<a href=\"#\" id=\"shell-step-btn\"class=\"list-group-item list-group-item-success btn btn-warning\">"+step_name+"</a>");
			$("#input-form").hide();
			$("#conf-canvas").show();
	 		addStep(stepCount,step_name, "conf-canvas");
 		}
     });
 	
 	// Shell step cancel button
 	$("#shell-cancel-btn").click(function( event ) { 	
 		clear_form();
 	});

 	//Executor functions
 	
 	$("#exec-wf").click(function(event) {
 		$("header").hide();
		$("#conf-tab").hide();
		 $("#exec-steps").show();
		 $("#input-form").hide();
		 clear_form();
 		$("#exec-tab").show();
		$("#wf-exec-name").val("VENUS - Job failure analysis");
 	});
 	
 	$("#wf-exec-btn").click(function(event) {
 		var workflow_name = $("#wf-exec-name").val();
 		var input = $("#input-exec-field").val();
		 if(jQuery.trim(workflow_name).length > 0) {
			$("#wf-exec-name").removeClass("invalid").addClass("valid");
			if(jQuery.trim(input).length > 0) {
				$("#input-exec-field").removeClass("invalid").addClass("valid");
				$("#exec-canvas").show();
				executing();
			} else {
				$("#input-exec-field").removeClass("valid").addClass("invalid");
			} 
		} else {
			$("#wf-exec-name").removeClass("valid").addClass("invalid");
		} 
 	});
 	
 	$("#wf-result-btn").click(function(event) {
 		alert("Please check the reports");
 	});
 	
 	
 	function executing() {
 		setTimeout(exec_flowchart_1,100);
 		setTimeout(exec_flowchart_2, 2000);
 		setTimeout(exec_flowchart_3, 7000);
 		setTimeout(exec_flowchart_4, 12000);
 		setTimeout(exec_flowchart_5, 17000);
 		setTimeout(exec_flowchart_6, 22000);
 	}
 	
 	function exec_flowchart_1() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|future\n';
 		code = code+'step2=>operation: Change control check|future\n';
 		code = code+'step3=>operation: Batch control check|future\n';
 		code = code+'step4=>operation: Error table validation|future\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 	}
 	
 	function exec_flowchart_2() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|current\n';
 		code = code+'step2=>operation: Change control check|future\n';
 		code = code+'step3=>operation: Batch control check|future\n';
 		code = code+'step4=>operation: Error table validation|future\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 	}
 	
 	function exec_flowchart_3() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|past\n';
 		code = code+'step2=>operation: Change control check|current\n';
 		code = code+'step3=>operation: Batch control check|future\n';
 		code = code+'step4=>operation: Error table validation|future\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 	}
 	
 	function exec_flowchart_4() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|past\n';
 		code = code+'step2=>operation: Change control check|past\n';
 		code = code+'step3=>operation: Batch control check|current\n';
 		code = code+'step4=>operation: Error table validation|future\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 		
 	}
 	
 	function exec_flowchart_5() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|past\n';
 		code = code+'step2=>operation: Change control check|past\n';
 		code = code+'step3=>operation: Batch control check|past\n';
 		code = code+'step4=>operation: Error table validation|current\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 		
 	}
 	
 	function exec_flowchart_6() {
 		var code ="";
 		code = code+'st=>start\ne=>end: End\n';
 		code = code+'step1=>operation: Spool file logs|past\n';
 		code = code+'step2=>operation: Change control check|past\n';
 		code = code+'step3=>operation: Batch control check|past\n';
 		code = code+'step4=>operation: Error table validation|past\n';
 		code = code+'st->step1\n';
 		code = code+'step1->step2\n';
 		code = code+'step2->step3\n';
 		code = code+'step3->step4\n';
 		code = code+'step4->e\n';
 		//alert(code);
 		draw(code, 'exec-canvas');
 		
 	}
 	
 	function executeStep(number,stepName, canvas) {
 		mockRunning(number, stepName);
 		var stepFlow = addStepFlow();
 		var code="";
 		for (var index= 0; index < stepDescription.length; index++)
 			code =code+"\n"+stepDescription[index];
 		code= code+"\n"+stepFlow;
 		alert(code);
 		draw(code, canvas);
 		stepCount++;
 	}
 	 
 	function addStep(number,stepName, canvas) {
 		addStepDescription(number, stepName);
 		var stepFlow = addStepFlow();
 		var code="";
 		for (var index= 0; index < stepDescription.length; index++)
 			code =code+"\n"+stepDescription[index];
 		code= code+"\n"+stepFlow;
 		draw(code, canvas);
 		stepCount++;
 	}
 	
 	function mockRunning(number, stepName) {
 		steps.push("step"+number);
 		stepDescription.push("step"+number+"=>operation: "+stepName+"|current");
 	}
 	 	
 	function addStepDescription(number, stepName) {
 		steps.push("step"+number);
 		stepDescription.push("step"+number+"=>operation: "+stepName);
 	}
 	
 	function addStepFlow() {
 		var stepFlow;
 		var previousStep;
 		for	(var index = 0; index < steps.length; index++) {
 		    if(index == 0)
 		    	stepFlow ="st->"+steps[index];
 		    else
 		    	stepFlow= stepFlow+"\n"+previousStep+"->"+steps[index];
 		    previousStep = steps[index];
 		}
 		stepFlow = stepFlow+"\n"+previousStep+"->e";
 		return stepFlow;
 	}
 	
 	// Flowchart functions
 	function draw(code, canvas) {
         if (chart) {
           chart.clean();
         }
         chart = flowchart.parse(code);
         chart.drawSVG(canvas, {
           // 'x': 30,
           // 'y': 50,
           'line-width': 3,
           'line-length': 50,
           'text-margin': 10,
           'font-size': 14,
           'font': 'normal',
           'font-family': 'Roboto Slab',
           'font-weight': 'normal',
           'font-color': 'black',
           'line-color': 'black',
           'element-color': 'black',
           'fill': 'blue',
           'yes-text': 'yes',
           'no-text': 'no',
           'arrow-end': 'block',
           'scale': 1,
           'symbols': {
             'start': {
               'font-color': 'red',
               'element-color': 'green',
               'fill': 'white'
             },
             'end':{
               'class': 'end-element'
             }
           },
           'flowstate' : {
             'past' : { 'fill' : 'green', 'font-color' : 'white'},
             'current' : {'fill' : 'orange', 'font-color' : 'white', 'font-weight' : 'bold'},
             'future' : { 'fill' : 'yellow'},
             'request' : { 'fill' : 'blue'},
             'invalid': {'fill' : '#444444'},
             'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' },
             'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' }
           }
         });

 };
 
 // Add multiple input function
 $(document)
	.on('click','.btn-add',function(e) {
				e.preventDefault();
				var controlForm = $('.controls form:first'), currentEntry = $(
						this).parents('.entry:first'), newEntry = $(
						currentEntry.clone()).appendTo(controlForm);
				newEntry.find('input').val('');
				controlForm
						.find('.entry:not(:last) .btn-add')
						.removeClass('btn-add')
						.addClass('btn-remove')
						.removeClass('btn-success')
						.addClass('btn-danger')
						.html(
								'<span class="glyphicon glyphicon-minus"></span>');
			}).on('click', '.btn-remove', function(e) {
		$(this).parents('.entry:first').remove();
		e.preventDefault();
		return false;
	});

});





