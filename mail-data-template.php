<?php
// Данные почтового сервера
$mailHost                   = '';                       // SMTP сервера вашей почты
$mailPort                   = 465;                      // Порт(например: 465)
$SMTPSecure                 = 'ssl';                    // Протокол безопасности
$mailUsername               = '';                       // Логин на почте
$mailPassword               = '';                       // Пароль на почте
// Данные отправки
$charset                    = "UTF-8";                  // Кодировка
$mailTitle                  = 'Сообщение с сайта';      // Заголовок письма
$mailSetForm = [
  'fromEmail' => '',                                    // Почта отправителя
  'sender' => '',                                       // Имя отправителя
];
$addAddress = [
  'toEmail' => '',                                      // Почта получателя
  'recepient' => '',                                    // Имя получателя
];
$addAddressDev = [
  'toEmail' => '',                                      // Почта получателя
  'recepient' => '',                                    // Имя получателя
];
// Структура письма
function createBody(&$body) {
  foreach ( $_POST as $key => $value ) {
    $body .= "
      <tr><tr style='background-color: #f8f8f8;'>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
    ";
  }
};
