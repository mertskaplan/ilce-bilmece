<?php
/**
 * İlçe Bilmece - Eklenti yükleyici
 *
 * plugins/<ad>/ klasörüne atılan her eklenti otomatik olarak oyuna dahil olur:
 *   plugins/<ad>/plugin.js  → sayfaya yüklenir (zorunlu)
 *   plugins/<ad>/sw.js      → service worker'a yüklenir (isteğe bağlı)
 * Eklentinin diğer dosyaları (PHP, JSON, ayarlar) kendi klasöründe kalır.
 *
 * index.html bu dosyayı <script> ile, sw.js ise ?sw ile importScripts() üzerinden çağırır.
 * ?v=<değiştirilme zamanı> eklenir: eklenti güncellenince URL değişir, service worker eskiyi sunmaz.
 */
header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: no-cache');

$forSw = isset($_GET['sw']);
$files = [];
foreach (glob(__DIR__ . '/*/plugin.js') as $entry) {
    $dir = dirname($entry);
    $file = $forSw ? "$dir/sw.js" : $entry;
    if (is_file($file)) {
        $files[] = 'plugins/' . basename($dir) . '/' . basename($file) . '?v=' . filemtime($file);
    }
}

if ($forSw) {
    // Service worker sw.js'in yanında çalışır; yollar ona göredir. Worker'da document.currentScript
    // olmadığından eklentinin klasörü, yüklenmeden hemen önce self.EKLENTI_KLASORU ile bildirilir.
    foreach ($files as $src) {
        echo 'self.EKLENTI_KLASORU = ' . json_encode(dirname($src) . '/') . '; importScripts(' . json_encode($src) . ");\n";
    }
} else {
    echo '(' . json_encode($files) . ").forEach(function (src) {\n"
        . "    var s = document.createElement('script');\n"
        . "    s.src = src;\n"
        . "    document.head.appendChild(s);\n"
        . "});\n";
}
