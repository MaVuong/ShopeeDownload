var DATETIME_HEADER1 = 'ngày giao';
var DATETIME_HEADER2 = 'ngay giao';
var EDIT_TRIGGER1 = 'mã đơn hàng';
var EDIT_TRIGGER2 = 'ma don hang';

function onEdit(e) {  
 
  const row = e.range.getRow();
  const col = e.range.getColumn();
  const as = e.source.getActiveSheet();
  
  var arrFirstRow=as.getDataRange().getValues().shift();// lay ra dong dau tien;
  if(row<2){
    return;
  }
  // as.getRange(row, 11).setValue(JSON.stringify(arrFirstRow));  
  var hieu_col=col-1;
  if(hieu_col>0){
    if(arrFirstRow.length>hieu_col){
      var header_title=arrFirstRow[hieu_col];// me
      header_title=header_title.toLowerCase();
      if(header_title==EDIT_TRIGGER1||header_title==EDIT_TRIGGER2){

          var LL=arrFirstRow.length;
          var idTim=200;
          var allLine="";
          for(var k=0;k<LL;k++){
            var strTMP=arrFirstRow[k];
            if(!isNaN(strTMP)){
              continue;
            }
            strTMP=strTMP.toLowerCase();
            allLine=allLine+","+strTMP;
            if(strTMP==DATETIME_HEADER1||strTMP==DATETIME_HEADER2){
              idTim=(k+1);
              break;
            }
          }

          if(idTim<20){
            as.getRange(row, idTim).setValue(new Date()).setNumberFormat("dd/mm/yyyy hh:mm:ss");
            //as.getRange(row, 10).setValue(e.getValues()+"vldc");
          }else{
            //as.getRange(row, 10).setValue("Loi roi ko thim thay header:"+allLine);
          }
          
          //as.getRange(row, 1).setValue("xxxx")
      }else{
        //as.getRange(row, 9).setValue("error="+col+" "+header_title);
        //as.getRange(row, 10).setValue(JSON.stringify(arrFirstRow));
      }
    }else {
       // as.getRange(row, 9).setValue("error="+col+"");
    }
  }else{
    //as.getRange(row, 1).setValue("error=+");
  }
  
  
}
