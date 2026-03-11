TARGET_DIR="/Users/svinchon/Documents/Data/Not Sync Friendly/R&D/SpringBoot/multi-purpose-backend/src/main/resources/static/ionic"

publish_to_cloud_run_projet:
	npm run build
# 	ionic build --prod --base-href "/ionic/"
	rm -rf ${TARGET_DIR}
	mkdir -p ${TARGET_DIR}
	cp -rf dist/* ${TARGET_DIR}
#	sed -i '' 's|="/|="/ionic/|g' ${TARGET_DIR}/index.html

