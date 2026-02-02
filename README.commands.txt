used
	Ionic
		install -g @ionic/cli
		ionic start fsm-mobile-client-android tabs --type=angular
			- Go to your new project: cd ./fsm-mobile-client-react
			- Run ionic serve within the app directory to see your app in the browser
			- Run ionic capacitor add to add a native iOS or Android project using Capacitor
			(KO) - Generate your app icon and splash screens using cordova-res --skip-config --copy
			- Explore the Ionic docs for components, tutorials, and more: https://ion.link/docs
			- Building an enterprise app? Ionic has Enterprise Support and Features: https://ion.link/enterprise-edition
		cd ./fsm-mobile-client-android
		code .
		ionic serve (test in browser)
		ionic integrations enable capacitor *
		npm install @capacitor/core @capacitor/cli
		npx cap init
		ionic cap add android
		npm run build (same as ionic build?)
		ionic build
		ionic cap sync
		"webDir: 'dist'," in capacitor.config.ts
		ionic cap run android
			=> deployment ok and simple app with tabs ok
		npm install @capacitor/camera
		ionic build; ionic cap sync; ionic cap run android;
		npm install @ionic/pwa-elements

	history
		history
			=> thousands of lines
		history | tail -n 20
			=> last 20 lines

	Swagger
		http://0.0.0.0:8000/docs#/

	LLM
		Gemini
	ADB
		adb start-server
		adb devices
	on device/emulator debug
		npm run build; npx cap sync; npx cap run;
	emulator debug
		host is 10.0.2.2
		internet access needed

researched
	renommage
		recreate projet and copy code
