import alphaAsset from "@/assets/alpha.png.asset.json";
import keevoAsset from "@/assets/keevo.png.asset.json";

export function AlphaLogo({ className = "" }: { className?: string }) {
  return <img src={alphaAsset.url} alt="Alpha" className={className} />;
}

export function KeevoLogo({ className = "" }: { className?: string }) {
  return <img src={keevoAsset.url} alt="Keevo" className={className} />;
}