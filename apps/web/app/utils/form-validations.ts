// Kullanıcının girdisini otomatik E.164 formatına çevirir
export const formatToE164 = (num: string): string => {
  // Boşluk, parantez, tire ve artı dışındaki her şeyi temizle
  let cleaned = num.trim().replace(/[\s()-]/g, "");

  // Eğer çift sıfırla başlıyorsa (0090...) artıya çevir
  if (cleaned.startsWith("00")) {
    cleaned = `+${cleaned.slice(2)}`;
  }

  // Başında artı işareti yoksa kurallara göre ekle
  if (!cleaned.startsWith("+")) {
    if (cleaned.startsWith("0")) {
      // Örn: 05321234567 -> +905321234567
      cleaned = `+90${cleaned.slice(1)}`;
    } else if (cleaned.startsWith("90")) {
      // Örn: 905321234567 -> +905321234567
      cleaned = `+${cleaned}`;
    } else if (cleaned.length === 10 && cleaned.startsWith("5")) {
      // Örn: 5321234567 -> +905321234567 (Türkiye varsayılanı)
      cleaned = `+90${cleaned}`;
    } else if (cleaned.length > 0) {
      // Diğer durumlar için sadece + ekle
      cleaned = `+${cleaned}`;
    }
  }

  return cleaned;
};

// Form doğrulama fonksiyonu (E.164 dönüştürücüyü hesaba katar)
export const _validateSipForm = (formData: any) => {
  const localErrors: Record<string, string> = {};

  if (!formData.name.trim()) {
    localErrors.name = "Trunk adı alanı zorunludur.";
  }

  if (formData.username && formData.username.length < 3) {
    localErrors.username = "Kullanıcı adı en az 3 karakter olmalıdır.";
  }

  if (formData.password && formData.password.length < 8) {
    localErrors.password = "Parola en az 8 karakter olmalıdır.";
  }

  // Telefon numaralarını önce dönüştürüp sonra test ediyoruz
  const rawPhones = formData.phoneNumbers
    .split(",")
    .map((p: string) => p.trim())
    .filter(Boolean);
  if (rawPhones.length === 0) {
    localErrors.phoneNumbers = "En az bir telefon numarası girilmelidir.";
  } else {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    const formattedPhones = rawPhones.map(formatToE164);

    const hasInvalidPhone = formattedPhones.some(
      (num: string) => !e164Regex.test(num),
    );
    if (hasInvalidPhone) {
      localErrors.phoneNumbers =
        "Girdiğiniz numaralardan biri veya birkaçı geçersiz telefon numarası formatına sahip.";
    }
  }

  if (formData.type === "inbound") {
    const hasIPs =
      formData.allowedAddresses
        .split(",")
        .map((ip: string) => ip.trim())
        .filter(Boolean).length > 0;
    if (!hasIPs && (!formData.username || !formData.password)) {
      localErrors.allowedAddresses =
        "İzin verilen IP adresleri boş bırakılacaksa kullanıcı adı ve şifre zorunludur.";
    }
  }

  if (formData.type === "outbound") {
    if (!formData.address.trim()) {
      localErrors.address = "Domain veya Hedef IP adresi zorunludur.";
    } else if (formData.address.toLowerCase().startsWith("sip:")) {
      localErrors.address =
        "Adres alanı 'sip:' protokolü içermemelidir. Sadece hostname veya IP yazın.";
    }
  }

  return localErrors;
};
