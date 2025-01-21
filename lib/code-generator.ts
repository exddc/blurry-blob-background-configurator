// utils/generate-code.ts

import { BlobConfig } from "../types/blob-generator";

function getGradient(config: BlobConfig, startColor: string, endColor: string) {
  switch (config.gradientType) {
    case "linear":
      return `linear-gradient(45deg, ${startColor} 0%, ${endColor} 100%)`;
    case "radial":
      return `radial-gradient(circle at 50% 50%, ${startColor} 0%, ${endColor} 100%)`;
    case "conic":
    default:
      return `conic-gradient(from 90deg at 50% 50%, ${startColor} 0%, ${endColor} 100%)`;
  }
}

export function generateCode(config: BlobConfig): string {
  const blobDivs = Array.from({ length: config.numBlobs })
    .map((_, i) => {
      return `
        <div
          class="animate-[spin_${config.speed * (i + 1)}s_linear_infinite]"
          style="
            background: ${getGradient(
              config,
              config.colors[i * 2] || config.colors[0],
              config.colors[i * 2 + 1] || config.colors[1]
            )};
            width: ${config.size}px;
            height: 100%;
            margin-left: ${i === 0 ? "0" : config.distance + "px"};
          "
        ></div>`;
    })
    .join("");

  switch (config.codeType) {
    case "react":
      return generateReactCode(config, blobDivs);

    case "vue":
      return generateVueCode(config, blobDivs);

    default:
      // Fallback to React or an empty string
      return generateReactCode(config, blobDivs);
  }
}

// React
function generateReactCode(config: BlobConfig, blobDivs: string): string {
  return `
/* Add this to your CSS */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* JSX Component */
<main
  className="flex flex-col items-center justify-center min-h-screen relative"
  style={{ backgroundColor: "${config.backgroundColor}" }}
>
  <div className="relative">
    <div className="flex h-[${config.height}px] blur-[${config.blur}px]">
      ${blobDivs}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-4xl font-semibold text-center tracking-tight z-10">
        ${config.heading}
      </h1>
    </div>
  </div>
</main>
`;
}

// Vue
function generateVueCode(config: BlobConfig, blobDivs: string): string {
  return `
/* Add this to your CSS */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Vue Component */
<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen relative"
    :style="{ backgroundColor: '${config.backgroundColor}' }"
  >
    <div class="relative">
      <div class="flex h-[${config.height}px] blur-[${config.blur}px]">
        <!-- Start Blob Divs -->
        ${blobDivs}
        <!-- End Blob Divs -->
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-semibold text-center tracking-tight z-10">
          ${config.heading}
        </h1>
      </div>
    </div>
  </main>
</template>
`;
}




