   //! The model is empty but it'll store the attendace record.
    var model = {}


    var view =
    {
        //! This function initializes the attendance record randomly that's defined in the controller.
        init:function()
        {
            return controller.init()
        },


        checkboxes:$('tbody input'),
        all_missed: $('tbody .missed-col'),

        //! This function counts the number of missed classes for each student and updates the corresponding cell in the table. It calls the countMissing function in the controller.
        render_missing:function()
        {
            return controller.countMissing()
        },

        //! This function adds an event listener to all the checkboxes. When a checkbox is clicked, it calls the update_model function in the controller.
        event_handler:function()
        {
            $allCheckboxes = view.checkboxes;
            $allCheckboxes.on('click', function() 
            {
                controller.update_model()
            });
        
        }
    }

    var controller =
    {

        //! This function updates the attendance record in the model object and stores it in the browser's localStorage. It then calls the countMissing function to update the table.
        update_model:function()
        {
            var studentRows = $('tbody .student'),
                newAttendance = {};
            studentRows.each(function()
             {
                
                
                var name = $(this).children('.name-col').text(),
                
                    $allChecks = $(this).children('td').children('input');

                newAttendance[name] = [];

                $allChecks.each(function() 
                {
                    newAttendance[name].push($(this).prop('checked'));
                });
            });
            localStorage.model = JSON.stringify(newAttendance);
            controller.countMissing();
        },

        //! This function retrieves the attendance record from the localStorage.
        retrieve_model:function()
        {
            return JSON.parse(localStorage.getItem('model'))
        },

        //! This function counts the number of missed classes for each student and updates the corresponding cell in the table.
        countMissing:function() 
        {
            $allMissed = view.all_missed,
            $allMissed.each(function() 
            {
                
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;

                dayChecks.each(function() 
                {
                    if (!$(this).prop('checked')) 
                    {
                        numMissed++;
                    }
                });

                $(this).text(numMissed);
            });
        }
    }

    controller.init=function()
    {

        if (!localStorage.attendance) 
        {
            console.log('Creating attendance records...');
            function getRandom() 
            {
                return (Math.random() >= 0.5);
            }

            var nameColumns = $('tbody .name-col')
                attendance = {},
                names=["Slappy the Frog","Lily the Lizard","Palrus the Walrus","Gregory the Goat","Adam the Anaconda"],
            

            //!  an object created called attendance and I will pass to it an array containing the names of the students

            nameColumns.each(function(index,name) 
            {
                
                name.textContent=names[index]
                
            
                attendance[names[index]] = [];
                

                for (var i = 0; i <= 11; i++) 
                {
                    attendance[names[index]].push(getRandom());
                }

            });
            
            //! This is where the model is storing the attendance records.
            model=attendance;
            localStorage.model = JSON.stringify(model);

            //! function to check the ticks of every day based on the boolean values found in the model.
            $.each(model, function(name, days) 
            {
                
                
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');
        
                dayChecks.each(function(i) 
                {
                    $(this).prop('checked', days[i]);
                });
            });
        }
        localStorage.model = JSON.stringify(model);
    }
    view.init()
    view.event_handler()
    view.render_missing()