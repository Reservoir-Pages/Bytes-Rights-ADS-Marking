<?php
// Подключаем библиотеку PHPMailer
require 'phpmailer/PHPMailer.php';                                          //
require 'phpmailer/SMTP.php';                                               //
require 'phpmailer/Exception.php';                                          //
require 'mail-data.php';                                                    // файл с данными по отправке писем
// Формирование тела письма
$body = '';
createBody($body);
$body = "<table style='width: 100%;'>$body</table>";
// Подключение PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
// Установка параметров отправки
$mail->isSMTP();                                                            // Отправка через SMTP
// $mail->SMTPDebug  = 4;                                                      // Устанавливаем максимальный уровень отладки
$mail->SMTPAuth   = true;                                                   // SMTP аутентификация
$mail->Host       = $mailHost;                                              // Адрес SMTP сервера
$mail->Port       = $mailPort;                                              // порт подключения
$mail->SMTPSecure = $SMTPSecure;                                            // шифрование ssl
$mail->Username   = $mailUsername;                                          // Логин
$mail->Password   = $mailPassword;                                          // Пароль
// Настройки письма
$mail->isHTML(true);                                                        // Ввиде HTML
$mail->Body       = $body;                                                  // Тело письма
$mail->CharSet    = $charset;                                               // Кодировка
$mail->Subject    = $mailTitle;                                             // Тема письма
$mail->setFrom($mailSetForm['fromEmail'], $mailSetForm['sender']);          // От куда
$mail->addAddress($addAddress['toEmail'], $addAddress['recepient']);        // Куда
$mail->addAddress($addAddressDev['toEmail'], $addAddressDev['recepient']);  // Куда
// Отправляем
if ($mail->send()) {
  echo 'Письмо отправлено!';
} else {
  echo 'Ошибка: ' . $mail->ErrorInfo;
}
