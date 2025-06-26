# Modern Discord Botu

Bu, Discord.js v14 ile yazılmış, modern tasarımlı bir Discord botudur. Bot, sunucu yönetimi ve toplu DM gönderme gibi işlevsellik sunar. Uygulama komutları (slash commands) kullanır ve tüm mesajlar (DM'ler hariç) hoş tasarımlı embed'lerle sunulur.

## Özellikler
- **/kontrol**: Sunucudaki üyelerin DM durumlarını kontrol eder ve detaylı bir rapor sunar (kimlere DM gönderilebilir/gönderilemez).
- **/istatistik**: Sunucu istatistiklerini gösterir (toplam üye, çevrimiçi üye, seste olanlar, boost sayısı).
- **/dm-gonder**: Sunucu üyelerine toplu DM gönderir. Özellikler:
  - Zorunlu `mesaj` seçeneği: Gönderilecek mesaj.
  - İsteğe bağlı `rol` seçeneği: Sadece belirtilen role sahip üyelere DM gönderir.
  - İsteğe bağlı `muaf` seçeneği: Belirtilen role sahip üyelere DM gönderilmez.

## Gereksinimler
- **Node.js**: v16 veya üstü
- **Discord.js**: v14.15.3
- Bir Discord botu tokenı ve sunucu ID'si

## Kurulum
1. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

2. **config.json Dosyasını Düzenleyin**:
   `config.json` dosyasını aşağıdaki gibi doldurun:
   ```json
    {
      "tokencik": "",
      "sunucuId": "",
      "sesId": "",
      "clientId": ""
    }
   ```
   - **tokencit**: [Discord Developer Portal](https://discord.com/developers/applications)'dan bot tokenınızı alın.
   - **sunucuId**: Sunucu ID'sini almak için Discord'da geliştirici modunu açın (Ayarlar > Görünüm > Geliştirici Modu), sunucuya sağ tıklayın ve "ID'yi Kopyala"yı seçin.
   - **sesId**: Ses kanalı id si için botun bağlanacağı ses kanalına sağ tık yapıp id yi kopyala yapın.
   - **clientId**: Botun client ID'sini Developer Portal'dan "Application ID" olarak kopyalayın.

3. **Botu Sunucuya Davet Edin**:
   Botu sunucunuza davet etmek için şu URL'yi kullanın:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
   ```
   `YOUR_CLIENT_ID` yerine botunuzun client ID'sini yazın.

4. **Botu Başlatın**:
   ```bash
   node .
   ```
   Bot çalıştığında, konsolda "Komutlar başarıyla kaydedildi!" mesajını görmelisiniz. Komutlar otomatik olarak sunucunuza kaydedilir.

## Dosya Yapısı
```
discord-bot/
├── src/
│   ├── commands/
│   │   ├── kontrol.js
│   │   ├── istatistik.js
│   │   ├── dm-gonder.js
│   ├── events/
│   │   ├── ready.js
│   │   ├── interactionCreate.js
├── config.json
├── index.js
├── package.json
├── README.md
```

## Kullanım
- Botu başlattıktan sonra, sunucuda `/` yazarak komutları görebilirsiniz.
- **/kontrol**: Sunucudaki üyelerin DM durumlarını kontrol eder.
- **/istatistik**: Sunucu istatistiklerini gösterir.
- **/dm-gonder**: Örnek kullanım:
  ```bash
  /dm-gonder mesaj:Merhaba herkese! rol:@Üyeler muaf:@Admin
  ```
  Bu, sadece `@Üyeler` rolüne sahip kişilere "Merhaba herkese!" mesajını gönderir, ancak `@Admin` rolüne sahip kişilere göndermez.

## Notlar
- Botun çalışması için gerekli izinler: **Uygulama Komutlarını Kullan**, **Sunucu Üyelerini Görüntüle**, **Mesaj Gönder**.
- Komutlar, bot her başlatıldığında otomatik olarak belirtilen sunucuya (`guildId`) kaydedilir.
- Komutların görünmesi birkaç saniye sürebilir. Eğer görünmezse, botu sunucudan atıp yeniden davet etmeyi deneyin.

## Sorun Giderme
- **Komutlar görünmüyor mu?**
  - `config.json` dosyasındaki `tokencik`, `sunucuId`, `sesId` ve `clientId` değerlerini kontrol edin.
  - Konsolda hata mesajı varsa, bunları inceleyin.
  - Botun sunucuda gerekli izinlere sahip olduğundan emin olun.
- **Hata alıyorsanız**:
  - Konsol çıktılarını kontrol edin ve hata mesajlarını paylaşın.

## Lisans
Bu proje MIT Lisansı altında lisanslanmıştır.
