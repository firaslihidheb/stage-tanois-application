// getEmployees();
// function getEmployees() {
//     $.ajax({
//         url: `${api_url}/employee/all`,
//         type: 'get',
//         beforeSend: function (request) {
//             request.setRequestHeader("Authorization", auth);
//         },
//         contentType: 'application/json',
//         success: function(data, textStatus, jqXHR){
//             if(jqXHR.status === 200){
//                 $('#employees-table').dataTable({
//                     data: data.data,
//                     destroy: true,
//                     columns: [
//                         {data: 'name'},
//                         {data: 'qualification'},
//                         {data: 'description'},
//                         {data: 'mobiel'},
//                         {data: 'sku'}
//                     ],
//                     responsive: true
//                 });
//                 $('.no_data_found').hide();
//                 $('#employees-table').show();
//             }
//             else if(jqXHR.status === 204){
//                 $('#employees-table').hide();
//                 $('.no_data_found').html('<h3 class="m-t-15">No employee Found</h3>');
//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown){
//             console.log(jqXHR.responseJSON);
//             $('#employees-table').hide();
//             $('.no_data_found').html('<h3 class="m-t-15">No Employee Found</h3>');
//         }
//     });
//     return false;
// }
// $(document).ready(function () {

//     $(document).on('click', ".add_new_contract", function () {
//         $('.add-contract-form').show();
//         $('.remove_new_contract').show();
//         $('.add_new_contract').hide();
//     })

//     $(document).on('click', ".remove_new_contract", function () {
//         $('.add-contract-form').hide();
//         $('.add-contract-form').trigger("reset");
//         $('.remove_new_contract').hide();
//         $('.add_new_contract').show();
//     })
// });