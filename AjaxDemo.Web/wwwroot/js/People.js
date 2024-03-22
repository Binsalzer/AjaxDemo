$(() => {

    const addModal = new bootstrap.Modal($("#add-modal")[0]);
    const editModal = new bootstrap.Modal($("#edit-modal")[0]);

    function refreshTable(cb) {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(function (person) {
                $("tbody").append(`
                <tr>
                    <td>${person.firstName}</td>
                    <td>${person.lastName}</td>
                    <td>${person.age}</td>
                    <td>
                        <button class='btn btn-warning' data-person-id='${person.id}'>Edit</button>
                        <button class='btn btn-danger ml-3' data-person-id='${person.id}'>Delete</button>
                    </td>
                </tr>`)
            });

            if (cb) {
                cb();
            }
        });
    }

    refreshTable();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $(".modal-title").text('Add Person');
        $("#save-person").show();
        $("#update-person").hide();
        addModal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            refreshTable(() => {
                addModal.hide();
            });

        });
    });



    $('table').on('click', '.btn-danger', function () {
        const id = $(this).data('person-id')
        $.post('/home/delete', { id }, function () {
            refreshTable()
        })
    })

    $('table').on('click', '.btn-warning', function () {
        console.log('show')
        const id = $(this).data('person-id')
        $.get('/home/getPersonById', { id }, function ({ firstName, lastName, age }) {
            $('#edit-firstName').val(firstName)
            $('#edit-lastName').val(lastName)
            $('#edit-age').val(age)
            $('#edit-modal').data('edit-person-id', id)
            editModal.show()
        })

        $('#update-person').on('click', function () {
            const person = {
                id: $("#edit-modal").data('edit-person-id'),
                firstName: $('#edit-firstName').val(),
                lastName: $('#edit-lastName').val(),
                age: $('#edit-age').val()
            }
            $.post('/home/update', { person }, function () {
                console.log(person.id)
                editModal.hide()
                refreshTable()
            })
        })
    })

})

