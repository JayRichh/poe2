// Auto-generated TypeScript definitions
// for poe2-data-main, excluding 'metadata', translations, etc.

declare namespace Poe2DataMain {
  export namespace Data {
    export interface AbyssbosslifescalingperlevelItem {
      Level?: number;
      Life?: number;
    }
    /** Source: data\abyssbosslifescalingperlevel.json */
    export interface Abyssbosslifescalingperlevel extends Array<AbyssbosslifescalingperlevelItem> {}
    
    export interface AbyssobjectsItem {
      Id?: string;
      MinLevel?: number;
      MaxLevel?: number;
      SpawnWeight?: number;
      Unk004?: number;
      MetadataFile?: string;
      Unk006?: number;
      DaemonSpawners?: any[];
      Unk008?: number;
      Unk009?: number;
      AbyssalDepths?: any;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
    }
    /** Source: data\abyssobjects.json */
    export interface Abyssobjects extends Array<AbyssobjectsItem> {}
    
    export interface AchievementitemrewardsItem {
      AchievementItemsKey?: AchievementitemrewardsItem_AchievementItemsKey;
      BaseItemTypesKey?: AchievementitemrewardsItem_BaseItemTypesKey;
      Message?: string;
      Id?: string;
    }
    export interface AchievementitemrewardsItem_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface AchievementitemrewardsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\achievementitemrewards.json */
    export interface Achievementitemrewards extends Array<AchievementitemrewardsItem> {}
    
    export interface AchievementitemsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Name?: string;
      CompletionsRequired?: number;
      AchievementsKey?: AchievementitemsItem_AchievementsKey;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
    }
    export interface AchievementitemsItem_AchievementsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\achievementitems.json */
    export interface Achievementitems extends Array<AchievementitemsItem> {}
    
    export interface AchievementsItem {
      Id?: string;
      Description?: string;
      SetId?: number;
      Objective?: string;
      HASH16?: number;
      Unk005?: boolean;
      HideAchievementItems?: boolean;
      Unk007?: boolean;
      MinCompletedItems?: number;
      TwoColumnLayout?: boolean;
      ShowItemCompletionsAsOne?: boolean;
      Unk011?: string;
      SoftcoreOnly?: boolean;
      HardcoreOnly?: boolean;
      Unk014?: boolean;
      Unk015?: string;
      Unk016?: string;
      Unk017?: string;
    }
    /** Source: data\achievements.json */
    export interface Achievements extends Array<AchievementsItem> {}
    
    export interface AchievementsetrewardsItem {
      SetId?: number;
      AchievementsRequired?: number;
      Rewards?: AchievementsetrewardsItem_Rewards;
      TotemPieceEveryNAchievements?: number;
      Message?: string;
      NotificationIcon?: string;
      HideoutName?: string;
      Id?: string;
    }
    export interface AchievementsetrewardsItem_RewardsItem {
      TableName?: string;
      Id?: string;
    }
    export interface AchievementsetrewardsItem_Rewards extends Array<AchievementsetrewardsItem_RewardsItem> {}
    /** Source: data\achievementsetrewards.json */
    export interface Achievementsetrewards extends Array<AchievementsetrewardsItem> {}
    
    export interface AchievementsetsdisplayItem {
      Id?: number;
      Title?: string;
    }
    /** Source: data\achievementsetsdisplay.json */
    export interface Achievementsetsdisplay extends Array<AchievementsetsdisplayItem> {}
    
    export interface ActiontypesItem {
      Id?: string;
      Unk001?: number;
    }
    /** Source: data\actiontypes.json */
    export interface Actiontypes extends Array<ActiontypesItem> {}
    
    export interface ActivesettingsItem {
      Unk000?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: ActivesettingsItem_Unk003;
      Unk004?: ActivesettingsItem_Unk004;
      Unk005?: ActivesettingsItem_Unk005;
      Unk006?: ActivesettingsItem_Unk006;
      Unk007?: number;
    }
    export interface ActivesettingsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ActivesettingsItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ActivesettingsItem_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ActivesettingsItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\activesettings.json */
    export interface Activesettings extends Array<ActivesettingsItem> {}
    
    /** Source: data\activeskillrequirementicons.json */
    export type Activeskillrequirementicons = any[];
    
    export interface ActiveskillrequirementsItem {
      SomeRef01?: ActiveskillrequirementsItem_SomeRef01;
      SomeRef02?: ActiveskillrequirementsItem_SomeRef02;
      SomeInt01?: number;
      SomeBool01?: boolean;
      SomeInt02?: number;
    }
    export interface ActiveskillrequirementsItem_SomeRef01 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ActiveskillrequirementsItem_SomeRef02 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\activeskillrequirements.json */
    export interface Activeskillrequirements extends Array<ActiveskillrequirementsItem> {}
    
    export interface ActiveskillsItem {
      Id?: string;
      DisplayedName?: string;
      Description?: string;
      ActionType?: ActiveskillsItem_ActionType;
      Icon_DDSFile?: string;
      ActiveSkillTargetTypes?: number[];
      ActiveSkillTypes?: ActiveskillsItem_ActiveSkillTypes;
      WeaponRestriction_ItemClassesKeys?: ActiveskillsItem_WeaponRestriction_ItemClassesKeys;
      WebsiteDescription?: string;
      WebsiteImage?: string;
      Unk010?: boolean;
      Unk011?: string;
      Unk012?: boolean;
      SkillTotemId?: number;
      IsManuallyCasted?: boolean;
      Input_StatKeys?: ActiveskillsItem_Input_StatKeys;
      Output_StatKeys?: ActiveskillsItem_Output_StatKeys;
      MinionActiveSkillTypes?: any[];
      Unk018?: boolean;
      Unk019?: boolean;
      Unk020?: any[];
      Unk021?: number;
      AlternateSkillTargetingBehavioursKey?: any;
      Unk023?: boolean;
      AIFile?: string;
      Unk025?: ActiveskillsItem_Unk025;
      Unk026?: boolean;
      Unk027?: boolean;
      Unk028?: boolean;
      TransfigureBase?: any;
      Unk030?: number;
      AudioEvent?: ActiveskillsItem_AudioEvent;
      Unk032?: number;
      Unk033?: any;
      Unk034?: any;
      Unk035?: string;
      Unk036?: boolean;
      Unk037?: number;
      CsdPath?: string;
    }
    export interface ActiveskillsItem_ActionType {
      TableName?: string;
      Id?: string;
    }
    export interface ActiveskillsItem_ActiveSkillTypesItem {
      TableName?: string;
      Id?: string;
    }
    export interface ActiveskillsItem_ActiveSkillTypes extends Array<ActiveskillsItem_ActiveSkillTypesItem> {}
    export interface ActiveskillsItem_WeaponRestriction_ItemClassesKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ActiveskillsItem_WeaponRestriction_ItemClassesKeys extends Array<ActiveskillsItem_WeaponRestriction_ItemClassesKeysItem> {}
    export interface ActiveskillsItem_Input_StatKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ActiveskillsItem_Input_StatKeys extends Array<ActiveskillsItem_Input_StatKeysItem> {}
    export interface ActiveskillsItem_Output_StatKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ActiveskillsItem_Output_StatKeys extends Array<ActiveskillsItem_Output_StatKeysItem> {}
    export interface ActiveskillsItem_Unk025Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ActiveskillsItem_Unk025 extends Array<ActiveskillsItem_Unk025Item> {}
    export interface ActiveskillsItem_AudioEvent {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\activeskills.json */
    export interface Activeskills extends Array<ActiveskillsItem> {}
    
    export interface ActiveskilltypeItem {
      Id?: string;
      FlagStat?: ActiveskilltypeItem_FlagStat;
    }
    export interface ActiveskilltypeItem_FlagStat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\activeskilltype.json */
    export interface Activeskilltype extends Array<ActiveskilltypeItem> {}
    
    export interface ActsItem {
      Id?: string;
      Part?: number;
      Unk002?: any;
      Unk003?: number;
      ActNumber?: number;
      WorldPanelImage?: string;
      WorldPanelImageEpilogue?: any;
      Unk007?: number;
      IsPostGame?: boolean;
      Unk009?: number;
      Unk010?: any[];
    }
    /** Source: data\acts.json */
    export interface Acts extends Array<ActsItem> {}
    
    export interface AddbufftotargetvarietiesItem {
      BuffDefinitions?: AddbufftotargetvarietiesItem_BuffDefinitions;
      Unk001?: any[];
      StatsKeys?: AddbufftotargetvarietiesItem_StatsKeys;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: any[];
    }
    export interface AddbufftotargetvarietiesItem_BuffDefinitions {
      TableName?: string;
      Id?: string;
    }
    export interface AddbufftotargetvarietiesItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface AddbufftotargetvarietiesItem_StatsKeys extends Array<AddbufftotargetvarietiesItem_StatsKeysItem> {}
    /** Source: data\addbufftotargetvarieties.json */
    export interface Addbufftotargetvarieties extends Array<AddbufftotargetvarietiesItem> {}
    
    /** Source: data\additionallifescaling.json */
    export type Additionallifescaling = any[];
    
    /** Source: data\additionallifescalingperlevel.json */
    export type Additionallifescalingperlevel = any[];
    
    export interface AdditionalmonsterpacksfromstatsItem {
      StatsKey?: AdditionalmonsterpacksfromstatsItem_StatsKey;
      Unk001?: number;
      MonsterPacksKeys?: any[];
      AdditionalMonsterPacksStatMode?: number;
      PackCountStatsKey?: any;
      StatsKeys?: any[];
      StatsValues?: any[];
      Unk007?: number;
      PackSizeStatsKey?: any;
    }
    export interface AdditionalmonsterpacksfromstatsItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\additionalmonsterpacksfromstats.json */
    export interface Additionalmonsterpacksfromstats extends Array<AdditionalmonsterpacksfromstatsItem> {}
    
    /** Source: data\advancedcraftingbenchcustomtags.json */
    export type Advancedcraftingbenchcustomtags = any[];
    
    /** Source: data\advancedcraftingbenchtabfiltertypes.json */
    export type Advancedcraftingbenchtabfiltertypes = any[];
    
    export interface AdvancedskillstutorialItem {
      Id?: string;
      SkillGemInfoKey1?: AdvancedskillstutorialItem_SkillGemInfoKey1;
      SkillGemInfoKey2?: AdvancedskillstutorialItem_SkillGemInfoKey2;
      Description?: string;
      International_BK2File?: string;
      SkillGemsKey?: any;
      China_BK2File?: string;
      CharactersKey?: any[];
    }
    export interface AdvancedskillstutorialItem_SkillGemInfoKey1Item {
      TableName?: string;
      Id?: string;
    }
    export interface AdvancedskillstutorialItem_SkillGemInfoKey1 extends Array<AdvancedskillstutorialItem_SkillGemInfoKey1Item> {}
    export interface AdvancedskillstutorialItem_SkillGemInfoKey2Item {
      TableName?: string;
      Id?: string;
    }
    export interface AdvancedskillstutorialItem_SkillGemInfoKey2 extends Array<AdvancedskillstutorialItem_SkillGemInfoKey2Item> {}
    /** Source: data\advancedskillstutorial.json */
    export interface Advancedskillstutorial extends Array<AdvancedskillstutorialItem> {}
    
    export interface AegisvariationsItem {
      Name?: string;
      DefendsAgainstPhysical?: boolean;
      DefendsAgainstFire?: boolean;
      DefendsAgainstCold?: boolean;
      DefendsAgainstLightning?: boolean;
      DefendsAgainstChaos?: boolean;
      Unk006?: AegisvariationsItem_Unk006;
      Unk007?: AegisvariationsItem_Unk007;
      Unk008?: AegisvariationsItem_Unk008;
      Unk009?: AegisvariationsItem_Unk009;
      Unk010?: any[];
    }
    export interface AegisvariationsItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface AegisvariationsItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface AegisvariationsItem_Unk008 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface AegisvariationsItem_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\aegisvariations.json */
    export interface Aegisvariations extends Array<AegisvariationsItem> {}
    
    export interface AfflictionbalanceperlevelItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    /** Source: data\afflictionbalanceperlevel.json */
    export interface Afflictionbalanceperlevel extends Array<AfflictionbalanceperlevelItem> {}
    
    export interface AfflictionendgamewavemodsItem {
      ModsKey?: AfflictionendgamewavemodsItem_ModsKey;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
    }
    export interface AfflictionendgamewavemodsItem_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\afflictionendgamewavemods.json */
    export interface Afflictionendgamewavemods extends Array<AfflictionendgamewavemodsItem> {}
    
    export interface AfflictionfixedmodsItem {
      Rarity?: number;
      Mod?: AfflictionfixedmodsItem_Mod;
      Unk002?: AfflictionfixedmodsItem_Unk002;
    }
    export interface AfflictionfixedmodsItem_Mod {
      TableName?: string;
      Id?: string;
    }
    export interface AfflictionfixedmodsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\afflictionfixedmods.json */
    export interface Afflictionfixedmods extends Array<AfflictionfixedmodsItem> {}
    
    export interface AfflictionrandommodcategoriesItem {
      Id?: string;
      Unk001?: boolean;
    }
    /** Source: data\afflictionrandommodcategories.json */
    export interface Afflictionrandommodcategories extends Array<AfflictionrandommodcategoriesItem> {}
    
    export interface AfflictionrewardmapmodsItem {
      ModsKey?: AfflictionrewardmapmodsItem_ModsKey;
      Unk001?: boolean;
    }
    export interface AfflictionrewardmapmodsItem_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\afflictionrewardmapmods.json */
    export interface Afflictionrewardmapmods extends Array<AfflictionrewardmapmodsItem> {}
    
    export interface AfflictionrewardtypevisualsItem {
      AfflictionRewardTypes?: number;
      Id?: string;
      Name?: string;
    }
    /** Source: data\afflictionrewardtypevisuals.json */
    export interface Afflictionrewardtypevisuals extends Array<AfflictionrewardtypevisualsItem> {}
    
    export interface AfflictionsplitdemonsItem {
      Unk000?: number;
      MonsterVarietiesKey?: AfflictionsplitdemonsItem_MonsterVarietiesKey;
      AfflictionRandomModCategoriesKey?: AfflictionsplitdemonsItem_AfflictionRandomModCategoriesKey;
    }
    export interface AfflictionsplitdemonsItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface AfflictionsplitdemonsItem_AfflictionRandomModCategoriesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\afflictionsplitdemons.json */
    export interface Afflictionsplitdemons extends Array<AfflictionsplitdemonsItem> {}
    
    /** Source: data\afflictionstartdialogue.json */
    export type Afflictionstartdialogue = any[];
    
    export interface AlternatepassiveadditionsItem {
      Id?: string;
      AlternateTreeVersionsKey?: AlternatepassiveadditionsItem_AlternateTreeVersionsKey;
      SpawnWeight?: number;
      StatsKeys?: AlternatepassiveadditionsItem_StatsKeys;
      Stat1Min?: number;
      Stat1Max?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      PassiveType?: number[];
      Unk011?: number;
    }
    export interface AlternatepassiveadditionsItem_AlternateTreeVersionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface AlternatepassiveadditionsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface AlternatepassiveadditionsItem_StatsKeys extends Array<AlternatepassiveadditionsItem_StatsKeysItem> {}
    /** Source: data\alternatepassiveadditions.json */
    export interface Alternatepassiveadditions extends Array<AlternatepassiveadditionsItem> {}
    
    export interface AlternatepassiveskillsItem {
      Id?: string;
      AlternateTreeVersionsKey?: AlternatepassiveskillsItem_AlternateTreeVersionsKey;
      Name?: string;
      PassiveType?: number[];
      StatsKeys?: AlternatepassiveskillsItem_StatsKeys;
      Stat1Min?: number;
      Stat1Max?: number;
      Stat2Min?: number;
      Stat2Max?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      SpawnWeight?: number;
      Unk018?: number;
      RandomMin?: number;
      RandomMax?: number;
      FlavourText?: string;
      DDSIcon?: string;
      AchievementItemsKeys?: any[];
      Unk024?: number;
      Unk025?: number;
    }
    export interface AlternatepassiveskillsItem_AlternateTreeVersionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface AlternatepassiveskillsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface AlternatepassiveskillsItem_StatsKeys extends Array<AlternatepassiveskillsItem_StatsKeysItem> {}
    /** Source: data\alternatepassiveskills.json */
    export interface Alternatepassiveskills extends Array<AlternatepassiveskillsItem> {}
    
    /** Source: data\alternatequalitytypes.json */
    export type Alternatequalitytypes = any[];
    
    export interface AlternateskilltargetingbehavioursItem {
      Id?: string;
      Unk001?: number;
      ClientStrings?: AlternateskilltargetingbehavioursItem_ClientStrings;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number[];
    }
    export interface AlternateskilltargetingbehavioursItem_ClientStrings {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\alternateskilltargetingbehaviours.json */
    export interface Alternateskilltargetingbehaviours extends Array<AlternateskilltargetingbehavioursItem> {}
    
    export interface AlternatetreeartItem {
      Unk000?: AlternatetreeartItem_Unk000;
      Circle1?: string;
      Circle2?: string;
      Glow?: string;
    }
    export interface AlternatetreeartItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\alternatetreeart.json */
    export interface Alternatetreeart extends Array<AlternatetreeartItem> {}
    
    export interface AlternatetreeversionsItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
    }
    /** Source: data\alternatetreeversions.json */
    export interface Alternatetreeversions extends Array<AlternatetreeversionsItem> {}
    
    /** Source: data\ancestraltrialunits.json */
    export type Ancestraltrialunits = any[];
    
    export interface AnimatedobjectflagsItem {
      AOFile?: string;
      Unk001?: number;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    /** Source: data\animatedobjectflags.json */
    export interface Animatedobjectflags extends Array<AnimatedobjectflagsItem> {}
    
    /** Source: data\animateweaponuniques.json */
    export type Animateweaponuniques = any[];
    
    export interface AnimationItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
      Mainhand_AnimationKey?: any;
      Offhand_AnimationKey?: any;
      Unk006?: boolean;
      Unk007?: any;
      Unk008?: any;
      Unk009?: boolean;
      Unk010?: any;
      Unk011?: any[];
    }
    /** Source: data\animation.json */
    export interface Animation extends Array<AnimationItem> {}
    
    export interface ApplydamagefunctionsItem {
      Id?: string;
      StatsKeys?: ApplydamagefunctionsItem_StatsKeys;
      Unk002?: boolean;
    }
    export interface ApplydamagefunctionsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ApplydamagefunctionsItem_StatsKeys extends Array<ApplydamagefunctionsItem_StatsKeysItem> {}
    /** Source: data\applydamagefunctions.json */
    export interface Applydamagefunctions extends Array<ApplydamagefunctionsItem> {}
    
    /** Source: data\archetyperewards.json */
    export type Archetyperewards = any[];
    
    export interface ArchetypesItem {
      Id?: string;
      CharactersKey?: any;
      PassiveSkillTreeURL?: string;
      AscendancyClassName?: string;
      Description?: string;
      UIImageFile?: string;
      TutorialVideo_BKFile?: string;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      BackgroundImageFile?: string;
      IsTemporary?: boolean;
      Unk012?: boolean;
      ArchetypeImage?: string;
      Unk014?: boolean;
      Unk015?: boolean;
    }
    /** Source: data\archetypes.json */
    export interface Archetypes extends Array<ArchetypesItem> {}
    
    export interface ArchitectlifescalingperlevelItem {
      Level?: number;
      MoreLife?: number;
    }
    /** Source: data\architectlifescalingperlevel.json */
    export interface Architectlifescalingperlevel extends Array<ArchitectlifescalingperlevelItem> {}
    
    export interface ArchnemesismetarewardsItem {
      Id?: string;
      RewardText?: string;
      RewardGroup?: number;
      ScriptArgument?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    /** Source: data\archnemesismetarewards.json */
    export interface Archnemesismetarewards extends Array<ArchnemesismetarewardsItem> {}
    
    /** Source: data\archnemesismodcomboachievements.json */
    export type Archnemesismodcomboachievements = any[];
    
    export interface ArchnemesismodsItem {
      Mod?: ArchnemesismodsItem_Mod;
      Name?: string;
      Visual?: any;
      TextStyles?: any[];
      Unk004?: boolean;
      Unk005?: boolean;
    }
    export interface ArchnemesismodsItem_Mod {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\archnemesismods.json */
    export interface Archnemesismods extends Array<ArchnemesismodsItem> {}
    
    export interface ArchnemesismodvisualsItem {
      Id?: string;
      Unk001?: any;
      Unk002?: any;
      Unk003?: ArchnemesismodvisualsItem_Unk003;
      Unk004?: any[];
      Unk005?: any[];
      Unk006?: any[];
      Unk007?: any[];
    }
    export interface ArchnemesismodvisualsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\archnemesismodvisuals.json */
    export interface Archnemesismodvisuals extends Array<ArchnemesismodvisualsItem> {}
    
    /** Source: data\archnemesisrecipes.json */
    export type Archnemesisrecipes = any[];
    
    /** Source: data\areadifficultystats.json */
    export type Areadifficultystats = any[];
    
    export interface AreainfluencedoodadsItem {
      StatsKey?: AreainfluencedoodadsItem_StatsKey;
      StatValue?: number;
      Unk002?: number;
      AOFiles?: string[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: string;
      Unk007?: any;
    }
    export interface AreainfluencedoodadsItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\areainfluencedoodads.json */
    export interface Areainfluencedoodads extends Array<AreainfluencedoodadsItem> {}
    
    /** Source: data\areastatsperdifficulty.json */
    export type Areastatsperdifficulty = any[];
    
    /** Source: data\areatransitionanimations.json */
    export type Areatransitionanimations = any[];
    
    export interface AreatransitionanimationtypesItem {
      Id?: string;
    }
    /** Source: data\areatransitionanimationtypes.json */
    export interface Areatransitionanimationtypes extends Array<AreatransitionanimationtypesItem> {}
    
    /** Source: data\areatransitioninfo.json */
    export type Areatransitioninfo = any[];
    
    export interface ArmourtypesItem {
      BaseItemTypesKey?: ArmourtypesItem_BaseItemTypesKey;
      Armour?: number;
      EvasionRating?: number;
      EnergyShield?: number;
      Unk02?: number;
      Unk03?: number;
      Unk04?: number;
    }
    export interface ArmourtypesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\armourtypes.json */
    export interface Armourtypes extends Array<ArmourtypesItem> {}
    
    /** Source: data\arrowspearoverride.json */
    export type Arrowspearoverride = any[];
    
    /** Source: data\arrowstatreference.json */
    export type Arrowstatreference = any[];
    
    export interface AscendancyItem {
      Id?: string;
      ClassNo?: number;
      Characters?: AscendancyItem_Characters;
      CoordinateRect?: string;
      RGBFlavourTextColour?: string;
      Name?: string;
      FlavourText?: string;
      OGGFile?: string;
      PassiveTreeImage?: string;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: boolean;
    }
    export interface AscendancyItem_CharactersItem {
      TableName?: string;
      Id?: string;
    }
    export interface AscendancyItem_Characters extends Array<AscendancyItem_CharactersItem> {}
    /** Source: data\ascendancy.json */
    export interface Ascendancy extends Array<AscendancyItem> {}
    
    /** Source: data\atlasexilebossarenas.json */
    export type Atlasexilebossarenas = any[];
    
    export interface AtlasexileinfluenceItem {
      Conqueror?: AtlasexileinfluenceItem_Conqueror;
      Sets?: AtlasexileinfluenceItem_Sets;
    }
    export interface AtlasexileinfluenceItem_Conqueror {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasexileinfluenceItem_SetsItem {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasexileinfluenceItem_Sets extends Array<AtlasexileinfluenceItem_SetsItem> {}
    /** Source: data\atlasexileinfluence.json */
    export interface Atlasexileinfluence extends Array<AtlasexileinfluenceItem> {}
    
    export interface AtlasexilesItem {
      Id?: string;
      Unk001?: number;
      InfluencedItemIncrStat?: AtlasexilesItem_InfluencedItemIncrStat;
      MapIcon?: string;
      MapIcon2?: string;
    }
    export interface AtlasexilesItem_InfluencedItemIncrStat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\atlasexiles.json */
    export interface Atlasexiles extends Array<AtlasexilesItem> {}
    
    export interface AtlasfavouredmapslotsItem {
      Unk000?: number;
      Unk001?: number;
      Requirement?: string;
    }
    /** Source: data\atlasfavouredmapslots.json */
    export interface Atlasfavouredmapslots extends Array<AtlasfavouredmapslotsItem> {}
    
    export interface AtlasfogItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
    }
    /** Source: data\atlasfog.json */
    export interface Atlasfog extends Array<AtlasfogItem> {}
    
    export interface AtlasinfluencedataItem {
      InfluencePack?: AtlasinfluencedataItem_InfluencePack;
      MonsterPacks?: any[];
      Unk002?: any;
      Unk003?: any[];
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: AtlasinfluencedataItem_Unk011;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: boolean;
    }
    export interface AtlasinfluencedataItem_InfluencePack {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasinfluencedataItem_Unk011 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\atlasinfluencedata.json */
    export interface Atlasinfluencedata extends Array<AtlasinfluencedataItem> {}
    
    export interface AtlasinfluenceoutcomesItem {
      Id?: string;
      Unk001?: number;
      Type?: number;
    }
    /** Source: data\atlasinfluenceoutcomes.json */
    export interface Atlasinfluenceoutcomes extends Array<AtlasinfluenceoutcomesItem> {}
    
    export interface AtlasinfluencesetsItem {
      Id?: string;
      InfluencePacks?: AtlasinfluencesetsItem_InfluencePacks;
    }
    export interface AtlasinfluencesetsItem_InfluencePacksItem {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasinfluencesetsItem_InfluencePacks extends Array<AtlasinfluencesetsItem_InfluencePacksItem> {}
    /** Source: data\atlasinfluencesets.json */
    export interface Atlasinfluencesets extends Array<AtlasinfluencesetsItem> {}
    
    export interface AtlasmemorylineItem {
      League?: string;
      League2?: string;
      StartPointArt?: string;
      MidPointArt?: string;
      EndPointArt?: string;
      PathArt?: string;
    }
    /** Source: data\atlasmemoryline.json */
    export interface Atlasmemoryline extends Array<AtlasmemorylineItem> {}
    
    export interface AtlasmodsItem {
      ModsKey?: AtlasmodsItem_ModsKey;
      AtlasModTiers?: number;
    }
    export interface AtlasmodsItem_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\atlasmods.json */
    export interface Atlasmods extends Array<AtlasmodsItem> {}
    
    /** Source: data\atlasnode.json */
    export type Atlasnode = any[];
    
    /** Source: data\atlasnodedefinition.json */
    export type Atlasnodedefinition = any[];
    
    /** Source: data\atlaspassiveskillsubtrees.json */
    export type Atlaspassiveskillsubtrees = any[];
    
    export interface AtlaspassiveskilltreegrouptypeItem {
      Id?: string;
    }
    /** Source: data\atlaspassiveskilltreegrouptype.json */
    export interface Atlaspassiveskilltreegrouptype extends Array<AtlaspassiveskilltreegrouptypeItem> {}
    
    /** Source: data\atlaspoem.json */
    export type Atlaspoem = any[];
    
    export interface AtlaspositionsItem {
      Unk000?: number;
      Unk001?: number;
      X?: number;
      Y?: number;
    }
    /** Source: data\atlaspositions.json */
    export interface Atlaspositions extends Array<AtlaspositionsItem> {}
    
    /** Source: data\atlasprimordialaltarchoices.json */
    export type Atlasprimordialaltarchoices = any[];
    
    export interface AtlasprimordialaltarchoicetypesItem {
      Id?: string;
      TopIconEater?: string;
      BottomIconEater?: string;
      TopIconExarch?: string;
      BottomIconExarch?: string;
      Text?: string;
    }
    /** Source: data\atlasprimordialaltarchoicetypes.json */
    export interface Atlasprimordialaltarchoicetypes extends Array<AtlasprimordialaltarchoicetypesItem> {}
    
    export interface AtlasprimordialbossesItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      InfluenceComplete?: AtlasprimordialbossesItem_InfluenceComplete;
      MiniBossInvitation?: AtlasprimordialbossesItem_MiniBossInvitation;
      BossInvitation?: AtlasprimordialbossesItem_BossInvitation;
      PickUpKey?: AtlasprimordialbossesItem_PickUpKey;
      Unk009?: AtlasprimordialbossesItem_Unk009;
      Unk010?: AtlasprimordialbossesItem_Unk010;
      Tag?: AtlasprimordialbossesItem_Tag;
      Altar?: AtlasprimordialbossesItem_Altar;
      AltarActivated?: AtlasprimordialbossesItem_AltarActivated;
    }
    export interface AtlasprimordialbossesItem_InfluenceComplete {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_MiniBossInvitation {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_BossInvitation {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_PickUpKey {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface AtlasprimordialbossesItem_Unk010 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface AtlasprimordialbossesItem_Tag {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_Altar {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossesItem_AltarActivated {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\atlasprimordialbosses.json */
    export interface Atlasprimordialbosses extends Array<AtlasprimordialbossesItem> {}
    
    export interface AtlasprimordialbossinfluenceItem {
      Boss?: AtlasprimordialbossinfluenceItem_Boss;
      Progress?: number;
      MinMapTier?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number;
      Unk007?: any;
    }
    export interface AtlasprimordialbossinfluenceItem_Boss {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\atlasprimordialbossinfluence.json */
    export interface Atlasprimordialbossinfluence extends Array<AtlasprimordialbossinfluenceItem> {}
    
    export interface AtlasprimordialbossoptionsItem {
      Unk000?: number;
      Unk001?: number;
      DefaultIcon?: string;
      HoverIcon?: string;
      HighlightIcon?: string;
      EmptyIcon?: string;
      Description?: AtlasprimordialbossoptionsItem_Description;
      DescriptionActive?: AtlasprimordialbossoptionsItem_DescriptionActive;
      ProgressTracker?: string;
      ProgressTrackerFill?: string;
      Name?: string;
      MapDeviceTrackerFill?: string;
    }
    export interface AtlasprimordialbossoptionsItem_Description {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasprimordialbossoptionsItem_DescriptionActive {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\atlasprimordialbossoptions.json */
    export interface Atlasprimordialbossoptions extends Array<AtlasprimordialbossoptionsItem> {}
    
    export interface AtlasupgradesinventorylayoutItem {
      Id?: string;
      Unk001?: number;
      Voidstone?: AtlasupgradesinventorylayoutItem_Voidstone;
      Unk003?: number;
      Objective?: string;
      GrantAtlasUpgrade?: AtlasupgradesinventorylayoutItem_GrantAtlasUpgrade;
      Unk006?: AtlasupgradesinventorylayoutItem_Unk006;
    }
    export interface AtlasupgradesinventorylayoutItem_Voidstone {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasupgradesinventorylayoutItem_GrantAtlasUpgrade {
      TableName?: string;
      Id?: string;
    }
    export interface AtlasupgradesinventorylayoutItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\atlasupgradesinventorylayout.json */
    export interface Atlasupgradesinventorylayout extends Array<AtlasupgradesinventorylayoutItem> {}
    
    export interface AttributerequirementsItem {
      BaseItemTypesKey?: AttributerequirementsItem_BaseItemTypesKey;
      Strength?: number;
      Intelligence?: number;
      Dexterity?: number;
    }
    export interface AttributerequirementsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\attributerequirements.json */
    export interface Attributerequirements extends Array<AttributerequirementsItem> {}
    
    /** Source: data\awarddisplay.json */
    export type Awarddisplay = any[];
    
    export interface BackenderrorsItem {
      Id?: string;
      Text?: string;
    }
    /** Source: data\backenderrors.json */
    export interface Backenderrors extends Array<BackenderrorsItem> {}
    
    /** Source: data\ballisticbouncebehaviour.json */
    export type Ballisticbouncebehaviour = any[];
    
    /** Source: data\ballisticbounceoverride.json */
    export type Ballisticbounceoverride = any[];
    
    export interface BaseitemtypesItem {
      Id?: string;
      ItemClassesKey?: BaseitemtypesItem_ItemClassesKey;
      Width?: number;
      Height?: number;
      Name?: string;
      InheritsFrom?: string;
      DropLevel?: number;
      FlavourTextKey?: any;
      Implicit_ModsKeys?: any[];
      SizeOnGround?: number;
      SoundEffect?: BaseitemtypesItem_SoundEffect;
      TagsKeys?: BaseitemtypesItem_TagsKeys;
      ModDomain?: number;
      SiteVisibility?: number;
      ItemVisualIdentity?: BaseitemtypesItem_ItemVisualIdentity;
      HASH32?: number;
      VendorRecipe_AchievementItems?: any[];
      Inflection?: string;
      Equip_AchievementItemsKey?: any;
      IsCorrupted?: boolean;
      Identify_AchievementItems?: any[];
      IdentifyMagic_AchievementItems?: any[];
      FragmentBaseItemTypesKey?: any;
      Unk023?: boolean;
      Unk024?: any;
      Unk025?: any;
      Unk026?: boolean;
      TradeMarketCategory?: any;
      Unmodifiable?: boolean;
      Achievement?: any[];
      Unk030?: any;
      Unk031?: any;
      Unk032?: boolean;
    }
    export interface BaseitemtypesItem_ItemClassesKey {
      TableName?: string;
      Id?: string;
    }
    export interface BaseitemtypesItem_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    export interface BaseitemtypesItem_TagsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface BaseitemtypesItem_TagsKeys extends Array<BaseitemtypesItem_TagsKeysItem> {}
    export interface BaseitemtypesItem_ItemVisualIdentity {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\baseitemtypes.json */
    export interface Baseitemtypes extends Array<BaseitemtypesItem> {}
    
    export interface BattlepassesItem {
      Id?: string;
      LeagueCategory?: number;
      International_BK2File?: string;
      China_BK2File?: string;
      MapCompletionCount?: number;
      Unk005?: boolean;
      Id2?: string;
    }
    /** Source: data\battlepasses.json */
    export interface Battlepasses extends Array<BattlepassesItem> {}
    
    export interface BattlepassrewardsItem {
      BattlePass?: BattlepassrewardsItem_BattlePass;
      RewardTier?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: boolean;
      Id?: string;
      RewardedMTX?: BattlepassrewardsItem_RewardedMTX;
      Unk007?: number;
      RewardDescription?: string;
      Unk009?: string;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      RewardTitle?: string;
      Unk014?: any;
      Unk015?: boolean;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: boolean;
      Unk026?: boolean;
    }
    export interface BattlepassrewardsItem_BattlePass {
      TableName?: string;
      Id?: string;
    }
    export interface BattlepassrewardsItem_RewardedMTXItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface BattlepassrewardsItem_RewardedMTX extends Array<BattlepassrewardsItem_RewardedMTXItem> {}
    /** Source: data\battlepassrewards.json */
    export interface Battlepassrewards extends Array<BattlepassrewardsItem> {}
    
    export interface BattlepasstracksItem {
      Id?: string;
      Description?: string;
    }
    /** Source: data\battlepasstracks.json */
    export interface Battlepasstracks extends Array<BattlepasstracksItem> {}
    
    export interface BelttypesItem {
      BaseItemTypesKey?: BelttypesItem_BaseItemTypesKey;
      CharmSlots?: number;
    }
    export interface BelttypesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\belttypes.json */
    export interface Belttypes extends Array<BelttypesItem> {}
    
    /** Source: data\bestiarycapturablemonsters.json */
    export type Bestiarycapturablemonsters = any[];
    
    /** Source: data\bestiaryencounters.json */
    export type Bestiaryencounters = any[];
    
    export interface BestiaryfamiliesItem {
      Id?: string;
      Name?: string;
      Icon?: string;
      IconSmall?: string;
      Illustration?: string;
      PageArt?: string;
      FlavourText?: string;
      Unk007?: boolean;
      TagsKey?: BestiaryfamiliesItem_TagsKey;
      Unk009?: number;
      ModsKeys?: BestiaryfamiliesItem_ModsKeys;
      CurrencyItemsKey?: BestiaryfamiliesItem_CurrencyItemsKey;
    }
    export interface BestiaryfamiliesItem_TagsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BestiaryfamiliesItem_ModsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface BestiaryfamiliesItem_ModsKeys extends Array<BestiaryfamiliesItem_ModsKeysItem> {}
    export interface BestiaryfamiliesItem_CurrencyItemsKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\bestiaryfamilies.json */
    export interface Bestiaryfamilies extends Array<BestiaryfamiliesItem> {}
    
    export interface BestiarygenusItem {
      Id?: string;
      Name?: string;
      BestiaryGroupsKey?: BestiarygenusItem_BestiaryGroupsKey;
      Name2?: string;
      Icon?: string;
    }
    export interface BestiarygenusItem_BestiaryGroupsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\bestiarygenus.json */
    export interface Bestiarygenus extends Array<BestiarygenusItem> {}
    
    export interface BestiarygroupsItem {
      Id?: string;
      Description?: string;
      Illustration?: string;
      Name?: string;
      Icon?: string;
      IconSmall?: string;
      BestiaryFamiliesKey?: BestiarygroupsItem_BestiaryFamiliesKey;
      AchievementItemsKeys?: any[];
    }
    export interface BestiarygroupsItem_BestiaryFamiliesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\bestiarygroups.json */
    export interface Bestiarygroups extends Array<BestiarygroupsItem> {}
    
    export interface BestiarynetsItem {
      BaseItemTypesKey?: BestiarynetsItem_BaseItemTypesKey;
      Unk001?: number;
      CaptureMinLevel?: number;
      CaptureMaxLevel?: number;
      DropMinLevel?: number;
      DropMaxLevel?: number;
      Unk006?: number;
      IsEnabled?: boolean;
    }
    export interface BestiarynetsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\bestiarynets.json */
    export interface Bestiarynets extends Array<BestiarynetsItem> {}
    
    export interface BestiaryrecipecategoriesItem {
      Id?: string;
      Text?: string;
    }
    /** Source: data\bestiaryrecipecategories.json */
    export interface Bestiaryrecipecategories extends Array<BestiaryrecipecategoriesItem> {}
    
    export interface BestiaryrecipecomponentItem {
      Id?: string;
      MinLevel?: number;
      BestiaryFamiliesKey?: any;
      BestiaryGroupsKey?: any;
      ModsKey?: any;
      BestiaryCapturableMonstersKey?: any;
      BeastRarity?: any;
      BestiaryGenusKey?: any;
    }
    /** Source: data\bestiaryrecipecomponent.json */
    export interface Bestiaryrecipecomponent extends Array<BestiaryrecipecomponentItem> {}
    
    export interface BestiaryrecipesItem {
      Id?: string;
      Description?: string;
      BestiaryRecipeComponentKeys?: BestiaryrecipesItem_BestiaryRecipeComponentKeys;
      Notes?: string;
      Category?: BestiaryrecipesItem_Category;
      Unk005?: boolean;
      Achievements?: BestiaryrecipesItem_Achievements;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      GameMode?: number;
      FlaskMod?: any;
    }
    export interface BestiaryrecipesItem_BestiaryRecipeComponentKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface BestiaryrecipesItem_BestiaryRecipeComponentKeys extends Array<BestiaryrecipesItem_BestiaryRecipeComponentKeysItem> {}
    export interface BestiaryrecipesItem_Category {
      TableName?: string;
      Id?: string;
    }
    export interface BestiaryrecipesItem_AchievementsItem {
      TableName?: string;
      Id?: string;
    }
    export interface BestiaryrecipesItem_Achievements extends Array<BestiaryrecipesItem_AchievementsItem> {}
    /** Source: data\bestiaryrecipes.json */
    export interface Bestiaryrecipes extends Array<BestiaryrecipesItem> {}
    
    export interface BetrayalchoiceactionsItem {
      Id?: string;
      BetrayalChoicesKey?: BetrayalchoiceactionsItem_BetrayalChoicesKey;
      ClientStringsKey?: any;
    }
    export interface BetrayalchoiceactionsItem_BetrayalChoicesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\betrayalchoiceactions.json */
    export interface Betrayalchoiceactions extends Array<BetrayalchoiceactionsItem> {}
    
    export interface BetrayalchoicesItem {
      Id?: string;
      Text?: string;
      Unk002?: number;
      Achievements?: any[];
    }
    /** Source: data\betrayalchoices.json */
    export interface Betrayalchoices extends Array<BetrayalchoicesItem> {}
    
    /** Source: data\betrayaldialogue.json */
    export type Betrayaldialogue = any[];
    
    /** Source: data\betrayalforts.json */
    export type Betrayalforts = any[];
    
    export interface BetrayaljobsItem {
      Id?: string;
      Text?: string;
      ExtraTerrainFeaturesKey?: any;
      Art?: string;
      Unk004?: number;
      Unk005?: number;
      WorldAreasKey?: any;
      Completion_AchievementItemsKey?: any[];
      OpenChests_AchievementItemsKey?: any[];
      MissionCompletion_AcheivementItemsKey?: any[];
    }
    /** Source: data\betrayaljobs.json */
    export interface Betrayaljobs extends Array<BetrayaljobsItem> {}
    
    export interface BetrayalranksItem {
      Id?: string;
      Text?: string;
      Level?: number;
      RankImage?: string;
    }
    /** Source: data\betrayalranks.json */
    export interface Betrayalranks extends Array<BetrayalranksItem> {}
    
    export interface BetrayalrelationshipstateItem {
      Id?: string;
      Text?: string;
    }
    /** Source: data\betrayalrelationshipstate.json */
    export interface Betrayalrelationshipstate extends Array<BetrayalrelationshipstateItem> {}
    
    export interface BetrayaltargetjobachievementsItem {
      BetrayalTargetsKey?: BetrayaltargetjobachievementsItem_BetrayalTargetsKey;
      BetrayalJobsKey?: BetrayaltargetjobachievementsItem_BetrayalJobsKey;
      AchievementItemsKey?: BetrayaltargetjobachievementsItem_AchievementItemsKey;
    }
    export interface BetrayaltargetjobachievementsItem_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BetrayaltargetjobachievementsItem_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BetrayaltargetjobachievementsItem_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\betrayaltargetjobachievements.json */
    export interface Betrayaltargetjobachievements extends Array<BetrayaltargetjobachievementsItem> {}
    
    export interface BetrayaltargetlifescalingperlevelItem {
      Level?: number;
      MoreLife?: number;
    }
    /** Source: data\betrayaltargetlifescalingperlevel.json */
    export interface Betrayaltargetlifescalingperlevel extends Array<BetrayaltargetlifescalingperlevelItem> {}
    
    export interface BetrayaltargetsItem {
      Id?: string;
      BetrayalRanksKey?: any;
      MonsterVarietiesKey?: any;
      BetrayalJobsKey?: any;
      Art?: string;
      Unk005?: boolean;
      ItemClasses?: any;
      FullName?: string;
      Safehouse_ARMFile?: string;
      ShortName?: string;
      Unk010?: number;
      SafehouseLeader_AcheivementItemsKey?: any;
      Level3_AchievementItemsKey?: any;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: any;
      ScriptArgument?: string;
    }
    /** Source: data\betrayaltargets.json */
    export interface Betrayaltargets extends Array<BetrayaltargetsItem> {}
    
    export interface BetrayaltraitorrewardsItem {
      BetrayalJobsKey?: BetrayaltraitorrewardsItem_BetrayalJobsKey;
      BetrayalTargetsKey?: BetrayaltraitorrewardsItem_BetrayalTargetsKey;
      BetrayalRanksKey?: BetrayaltraitorrewardsItem_BetrayalRanksKey;
      Description?: string;
      Description2?: string;
    }
    export interface BetrayaltraitorrewardsItem_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BetrayaltraitorrewardsItem_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BetrayaltraitorrewardsItem_BetrayalRanksKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\betrayaltraitorrewards.json */
    export interface Betrayaltraitorrewards extends Array<BetrayaltraitorrewardsItem> {}
    
    export interface BetrayalupgradesItem {
      Id?: string;
      Name?: string;
      Description?: string;
      ModsKey?: any[];
      ArtFile?: string;
      BetrayalUpgradeSlotsKey?: number;
      Unk006?: any[];
      ItemVisualIdentityKey0?: any;
      ItemVisualIdentityKey1?: any;
      GrantedEffectsKey?: any;
      Unk010?: number;
      ItemClassesKey?: any;
    }
    /** Source: data\betrayalupgrades.json */
    export interface Betrayalupgrades extends Array<BetrayalupgradesItem> {}
    
    export interface BetrayalwalllifescalingperlevelItem {
      Level?: number;
      MoreLife?: number;
    }
    /** Source: data\betrayalwalllifescalingperlevel.json */
    export interface Betrayalwalllifescalingperlevel extends Array<BetrayalwalllifescalingperlevelItem> {}
    
    /** Source: data\beyondfactions.json */
    export type Beyondfactions = any[];
    
    export interface BindablevirtualkeysItem {
      KeyCode?: number;
      Name?: string;
      Id?: string;
    }
    /** Source: data\bindablevirtualkeys.json */
    export interface Bindablevirtualkeys extends Array<BindablevirtualkeysItem> {}
    
    export interface BlightbalanceperlevelItem {
      Level?: number;
      Unk001?: number;
      Unk002?: number[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
    }
    /** Source: data\blightbalanceperlevel.json */
    export interface Blightbalanceperlevel extends Array<BlightbalanceperlevelItem> {}
    
    export interface BlightbosslifescalingperlevelItem {
      Level?: number;
      MoreLife?: number;
    }
    /** Source: data\blightbosslifescalingperlevel.json */
    export interface Blightbosslifescalingperlevel extends Array<BlightbosslifescalingperlevelItem> {}
    
    export interface BlightchesttypesItem {
      ChestsKey?: BlightchesttypesItem_ChestsKey;
    }
    export interface BlightchesttypesItem_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blightchesttypes.json */
    export interface Blightchesttypes extends Array<BlightchesttypesItem> {}
    
    export interface BlightcraftingitemsItem {
      Oil?: BlightcraftingitemsItem_Oil;
      Tier?: number;
      Achievements?: any[];
      UseType?: number;
      NameShort?: string;
    }
    export interface BlightcraftingitemsItem_Oil {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blightcraftingitems.json */
    export interface Blightcraftingitems extends Array<BlightcraftingitemsItem> {}
    
    /** Source: data\blightcraftingrecipes.json */
    export type Blightcraftingrecipes = any[];
    
    export interface BlightcraftingresultsItem {
      Id?: string;
      ModsKey?: any;
      PassiveSkillsKey?: BlightcraftingresultsItem_PassiveSkillsKey;
    }
    export interface BlightcraftingresultsItem_PassiveSkillsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blightcraftingresults.json */
    export interface Blightcraftingresults extends Array<BlightcraftingresultsItem> {}
    
    export interface BlightcraftingtypesItem {
      Id?: string;
      Unk001?: number;
      Unk002?: boolean;
    }
    /** Source: data\blightcraftingtypes.json */
    export interface Blightcraftingtypes extends Array<BlightcraftingtypesItem> {}
    
    export interface BlightcraftinguniquesItem {
      WordsKey?: BlightcraftinguniquesItem_WordsKey;
    }
    export interface BlightcraftinguniquesItem_WordsKey {
      TableName?: string;
      Text?: string;
    }
    /** Source: data\blightcraftinguniques.json */
    export interface Blightcraftinguniques extends Array<BlightcraftinguniquesItem> {}
    
    export interface BlightedsporeaurasItem {
      BuffDefinitionsKey?: BlightedsporeaurasItem_BuffDefinitionsKey;
      BuffStatValues?: number[];
      Unk002?: number;
      Unk003?: number[];
      Unk004?: number;
    }
    export interface BlightedsporeaurasItem_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blightedsporeauras.json */
    export interface Blightedsporeauras extends Array<BlightedsporeaurasItem> {}
    
    export interface BlightencountertypesItem {
      Id?: string;
      Icon?: string;
      IsGeneric?: boolean;
      Weight?: number;
    }
    /** Source: data\blightencountertypes.json */
    export interface Blightencountertypes extends Array<BlightencountertypesItem> {}
    
    export interface BlightencounterwavesItem {
      MonsterSpawnerId?: string;
      EncounterType?: BlightencounterwavesItem_EncounterType;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Wave?: number;
    }
    export interface BlightencounterwavesItem_EncounterType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blightencounterwaves.json */
    export interface Blightencounterwaves extends Array<BlightencounterwavesItem> {}
    
    export interface BlightrewardtypesItem {
      Id?: string;
      Icon?: string;
    }
    /** Source: data\blightrewardtypes.json */
    export interface Blightrewardtypes extends Array<BlightrewardtypesItem> {}
    
    export interface BlightstashtablayoutItem {
      Id?: string;
      StoredItem?: any;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
    }
    /** Source: data\blightstashtablayout.json */
    export interface Blightstashtablayout extends Array<BlightstashtablayoutItem> {}
    
    export interface BlighttopologiesItem {
      Id?: string;
      BlightTopologyNodesKey?: BlighttopologiesItem_BlightTopologyNodesKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
    }
    export interface BlighttopologiesItem_BlightTopologyNodesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blighttopologies.json */
    export interface Blighttopologies extends Array<BlighttopologiesItem> {}
    
    export interface BlighttopologynodesItem {
      Id?: string;
      Unk001?: any[];
      Size?: number;
      Angle?: number;
      Unk004?: number[];
      Unk005?: number[];
      Unk006?: number[];
      Unk007?: number[];
      Unk008?: number[];
      Unk009?: number[];
      Unk010?: number;
    }
    /** Source: data\blighttopologynodes.json */
    export interface Blighttopologynodes extends Array<BlighttopologynodesItem> {}
    
    export interface BlighttoweraurasItem {
      Id?: number;
      BuffDefinitionsKey?: BlighttoweraurasItem_BuffDefinitionsKey;
      Unk002?: number;
      MiscAnimatedKey?: BlighttoweraurasItem_MiscAnimatedKey;
    }
    export interface BlighttoweraurasItem_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BlighttoweraurasItem_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blighttowerauras.json */
    export interface Blighttowerauras extends Array<BlighttoweraurasItem> {}
    
    export interface BlighttowersItem {
      Id?: string;
      Name?: string;
      Description?: string;
      Icon?: string;
      NextUpgradeOptions?: BlighttowersItem_NextUpgradeOptions;
      Unk005?: number;
      Tier?: string;
      Radius?: number;
      Unk008?: number;
      SpendResourceAchievement?: any;
      StatsKey?: any;
      StatsKeys?: any[];
      StatsKeys2?: any[];
      Unk013?: boolean;
    }
    export interface BlighttowersItem_NextUpgradeOptionsItem {
      TableName?: string;
      Id?: string;
    }
    export interface BlighttowersItem_NextUpgradeOptions extends Array<BlighttowersItem_NextUpgradeOptionsItem> {}
    /** Source: data\blighttowers.json */
    export interface Blighttowers extends Array<BlighttowersItem> {}
    
    export interface BlighttowersperlevelItem {
      BlightTowersKey?: BlighttowersperlevelItem_BlightTowersKey;
      Unk001?: number;
      MonsterVarietiesKey?: any;
      Cost?: number;
      Unk004?: number;
    }
    export interface BlighttowersperlevelItem_BlightTowersKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\blighttowersperlevel.json */
    export interface Blighttowersperlevel extends Array<BlighttowersperlevelItem> {}
    
    /** Source: data\bloodhiteffects.json */
    export type Bloodhiteffects = any[];
    
    /** Source: data\bloodtypes.json */
    export type Bloodtypes = any[];
    
    /** Source: data\boltstatreference.json */
    export type Boltstatreference = any[];
    
    export interface BreachartvariationsItem {
      Id?: string;
      Unk001?: any;
      Unk002?: any;
      Unk003?: any;
      Unk004?: BreachartvariationsItem_Unk004;
      Unk005?: BreachartvariationsItem_Unk005;
      Unk006?: BreachartvariationsItem_Unk006;
      Unk007?: any;
      Unk008?: number[];
      Unk009?: BreachartvariationsItem_Unk009;
    }
    export interface BreachartvariationsItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface BreachartvariationsItem_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface BreachartvariationsItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface BreachartvariationsItem_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\breachartvariations.json */
    export interface Breachartvariations extends Array<BreachartvariationsItem> {}
    
    export interface BreachbosslifescalingperlevelItem {
      MonsterLevel?: number;
      LifeMultiplier?: number;
    }
    /** Source: data\breachbosslifescalingperlevel.json */
    export interface Breachbosslifescalingperlevel extends Array<BreachbosslifescalingperlevelItem> {}
    
    export interface BreachelementItem {
      Element?: string;
      Unk001?: BreachelementItem_Unk001;
      BaseBreachstone?: BreachelementItem_BaseBreachstone;
      BossMapMod?: BreachelementItem_BossMapMod;
      DuplicateBoss?: BreachelementItem_DuplicateBoss;
    }
    export interface BreachelementItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface BreachelementItem_BaseBreachstone {
      TableName?: string;
      Id?: string;
    }
    export interface BreachelementItem_BossMapMod {
      TableName?: string;
      Id?: string;
    }
    export interface BreachelementItem_DuplicateBoss {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\breachelement.json */
    export interface Breachelement extends Array<BreachelementItem> {}
    
    /** Source: data\breachstones.json */
    export type Breachstones = any[];
    
    export interface BuffdefinitionsItem {
      Id?: string;
      Description?: string;
      Invisible?: boolean;
      Removable?: boolean;
      Name?: string;
      StatsKeys?: BuffdefinitionsItem_StatsKeys;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Maximum_StatsKey?: any;
      Current_StatsKey?: any;
      Unk011?: boolean;
      Unk012?: number;
      BuffVisualsKey?: BuffdefinitionsItem_BuffVisualsKey;
      Unk014?: boolean;
      Unk015?: boolean;
      BuffCategory?: number;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: boolean;
      Unk020?: boolean;
      BuffLimit?: number;
      Unk022?: boolean;
      Id2?: string;
      IsRecovery?: boolean;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: boolean;
      Unk028?: number;
      Unk029?: boolean;
      Unk030?: boolean;
      Unk031?: number;
      Unk032?: any[];
      Unk033?: boolean;
      Unk034?: boolean;
      Unk035?: any[];
      Unk036?: boolean;
      Unk037?: any[];
      BinaryStats?: any[];
      Unk039?: BuffdefinitionsItem_Unk039;
      Unk040?: BuffdefinitionsItem_Unk040;
      Unk041?: boolean;
      Unk042?: boolean;
      Unk043?: boolean;
      Unk044?: boolean;
      Unk045?: boolean;
      Unk046?: any;
      Unk047?: any[];
      Unk048?: string;
      Unk049?: any[];
      Unk050?: boolean;
    }
    export interface BuffdefinitionsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface BuffdefinitionsItem_StatsKeys extends Array<BuffdefinitionsItem_StatsKeysItem> {}
    export interface BuffdefinitionsItem_BuffVisualsKey {
      TableName?: string;
      Id?: string;
    }
    export interface BuffdefinitionsItem_Unk039Item {
      TableName?: string;
      Id?: string;
    }
    export interface BuffdefinitionsItem_Unk039 extends Array<BuffdefinitionsItem_Unk039Item> {}
    export interface BuffdefinitionsItem_Unk040Item {
      TableName?: string;
      Id?: string;
    }
    export interface BuffdefinitionsItem_Unk040 extends Array<BuffdefinitionsItem_Unk040Item> {}
    /** Source: data\buffdefinitions.json */
    export interface Buffdefinitions extends Array<BuffdefinitionsItem> {}
    
    export interface BufftemplatesItem {
      Id?: string;
      BuffDefinitionsKey?: BufftemplatesItem_BuffDefinitionsKey;
      Buff_StatValues?: number[];
      AuraRadius?: number;
      Unk004?: any[];
      Unk005?: any[];
      BuffVisualsKey?: any;
      Unk007?: number;
      Unk008?: boolean;
      StatsKey?: any[];
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any;
    }
    export interface BufftemplatesItem_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\bufftemplates.json */
    export interface Bufftemplates extends Array<BufftemplatesItem> {}
    
    /** Source: data\buffvisualorbart.json */
    export type Buffvisualorbart = any[];
    
    export interface BuffvisualorbsItem {
      Id?: string;
      BuffVisualOrbTypesKey?: BuffvisualorbsItem_BuffVisualOrbTypesKey;
      BuffVisualOrbArtKeys?: BuffvisualorbsItem_BuffVisualOrbArtKeys;
      Player_BuffVisualOrbArtKeys?: BuffvisualorbsItem_Player_BuffVisualOrbArtKeys;
      BuffVisualOrbArtKeys2?: any[];
    }
    export interface BuffvisualorbsItem_BuffVisualOrbTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface BuffvisualorbsItem_BuffVisualOrbArtKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface BuffvisualorbsItem_BuffVisualOrbArtKeys extends Array<BuffvisualorbsItem_BuffVisualOrbArtKeysItem> {}
    export interface BuffvisualorbsItem_Player_BuffVisualOrbArtKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface BuffvisualorbsItem_Player_BuffVisualOrbArtKeys extends Array<BuffvisualorbsItem_Player_BuffVisualOrbArtKeysItem> {}
    /** Source: data\buffvisualorbs.json */
    export interface Buffvisualorbs extends Array<BuffvisualorbsItem> {}
    
    /** Source: data\buffvisualorbtypes.json */
    export type Buffvisualorbtypes = any[];
    
    export interface BuffvisualsItem {
      Id?: string;
      BuffDDSFile?: string;
      EPKFiles1?: string[];
      EPKFiles2?: string[];
      PreloadGroups?: any[];
      Unk005?: boolean;
      BuffName?: string;
      MiscAnimated1?: any;
      MiscAnimated2?: any;
      BuffDescription?: string;
      EPKFile?: string;
      HasExtraArt?: boolean;
      ExtraArt?: string;
      Unk013?: any[];
      EPKFiles?: any[];
      BuffVisualOrbs?: any[];
      MiscAnimated3?: any;
      Unk017?: any;
      Unk018?: any;
    }
    /** Source: data\buffvisuals.json */
    export interface Buffvisuals extends Array<BuffvisualsItem> {}
    
    export interface BuffvisualsartvariationsItem {
      Buff?: string;
      Unk001?: number[];
      Unk002?: number;
    }
    /** Source: data\buffvisualsartvariations.json */
    export interface Buffvisualsartvariations extends Array<BuffvisualsartvariationsItem> {}
    
    export interface BuffvisualsetentriesItem {
      Id?: string;
      Unk001?: number;
      BuffVisual?: BuffvisualsetentriesItem_BuffVisual;
      Unk003?: number;
    }
    export interface BuffvisualsetentriesItem_BuffVisual {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\buffvisualsetentries.json */
    export interface Buffvisualsetentries extends Array<BuffvisualsetentriesItem> {}
    
    /** Source: data\buffvisualshapeshiftoverride.json */
    export type Buffvisualshapeshiftoverride = any[];
    
    /** Source: data\caravanstops.json */
    export type Caravanstops = any[];
    
    export interface ChanceableitemclassesItem {
      ItemClass?: ChanceableitemclassesItem_ItemClass;
    }
    export interface ChanceableitemclassesItem_ItemClass {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\chanceableitemclasses.json */
    export interface Chanceableitemclasses extends Array<ChanceableitemclassesItem> {}
    
    export interface CharacteraudioeventsItem {
      Id?: string;
      Event?: CharacteraudioeventsItem_Event;
      Unk002?: number;
      Unk003?: number;
      Goddess_CharacterTextAudioKeys?: any[];
      JackTheAxe_CharacterTextAudioKeys?: any[];
      Unk006?: boolean;
      Unk007?: boolean;
    }
    export interface CharacteraudioeventsItem_Event {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\characteraudioevents.json */
    export interface Characteraudioevents extends Array<CharacteraudioeventsItem> {}
    
    /** Source: data\charactercreationbutton.json */
    export type Charactercreationbutton = any[];
    
    export interface CharactercreationdialogueItem {
      Character?: CharactercreationdialogueItem_Character;
      IntroDialogue?: CharactercreationdialogueItem_IntroDialogue;
      Unk03?: any;
      EscapeDialogue?: CharactercreationdialogueItem_EscapeDialogue;
    }
    export interface CharactercreationdialogueItem_Character {
      TableName?: string;
      Id?: string;
    }
    export interface CharactercreationdialogueItem_IntroDialogue {
      TableName?: string;
      Id?: string;
    }
    export interface CharactercreationdialogueItem_EscapeDialogue {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\charactercreationdialogue.json */
    export interface Charactercreationdialogue extends Array<CharactercreationdialogueItem> {}
    
    export interface CharactercreationiconsItem {
      Id?: string;
      Type?: string;
      Description?: string;
      Video?: string;
      Icon?: string;
    }
    /** Source: data\charactercreationicons.json */
    export interface Charactercreationicons extends Array<CharactercreationiconsItem> {}
    
    /** Source: data\charactermeleeskills.json */
    export type Charactermeleeskills = any[];
    
    export interface CharacterpaneldescriptionmodesItem {
      Id?: string;
      Unk001?: string;
      FormatString_Positive?: string;
      FormatString_Negative?: string;
    }
    /** Source: data\characterpaneldescriptionmodes.json */
    export interface Characterpaneldescriptionmodes extends Array<CharacterpaneldescriptionmodesItem> {}
    
    export interface CharacterpanelstatsItem {
      Id?: string;
      Text?: string;
      StatsKeys1?: CharacterpanelstatsItem_StatsKeys1;
      CharacterPanelDescriptionModesKey?: CharacterpanelstatsItem_CharacterPanelDescriptionModesKey;
      StatsKeys2?: any[];
      StatsKeys3?: any[];
      CharacterPanelTabsKey?: CharacterpanelstatsItem_CharacterPanelTabsKey;
      Unk007?: boolean;
      Unk008?: any[];
      Unk009?: number;
    }
    export interface CharacterpanelstatsItem_StatsKeys1Item {
      TableName?: string;
      Id?: string;
    }
    export interface CharacterpanelstatsItem_StatsKeys1 extends Array<CharacterpanelstatsItem_StatsKeys1Item> {}
    export interface CharacterpanelstatsItem_CharacterPanelDescriptionModesKey {
      TableName?: string;
      Id?: string;
    }
    export interface CharacterpanelstatsItem_CharacterPanelTabsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\characterpanelstats.json */
    export interface Characterpanelstats extends Array<CharacterpanelstatsItem> {}
    
    export interface CharacterpaneltabsItem {
      Id?: string;
      Unk001?: number;
      Text?: string;
      Unk003?: number;
    }
    /** Source: data\characterpaneltabs.json */
    export interface Characterpaneltabs extends Array<CharacterpaneltabsItem> {}
    
    export interface CharactersItem {
      Id?: string;
      Name?: string;
      AOFile?: string;
      ACTFile?: string;
      BaseMaxLife?: number;
      BaseMaxMana?: number;
      WeaponSpeed?: number;
      MinDamage?: number;
      MaxDamage?: number;
      MaxAttackDistance?: number;
      Icon?: string;
      IntegerId?: number;
      BaseStrength?: number;
      BaseDexterity?: number;
      BaseIntelligence?: number;
      Unk015?: CharactersItem_Unk015;
      Description?: string;
      StartSkillGem?: CharactersItem_StartSkillGem;
      Unk019?: number;
      Unk20?: number;
      Unk21?: number;
      IntroSoundFile?: string;
      StartWeapons?: CharactersItem_StartWeapons;
      Gender?: string;
      TraitDescription?: string;
      Unk027?: any;
      Unk028?: any;
      Unk029?: number;
      PassiveTreeImage?: string;
      Unk030?: CharactersItem_Unk030;
      Unk031?: CharactersItem_Unk031;
      Unk033?: number;
      PassiveTreeImageAgain?: string;
      TencentVideo?: string;
      AttrsAsId?: string;
      LoginScreen?: string;
      PlayerCritter?: string;
      PlayerEffect?: string;
      AfterImage?: string;
      Mirage?: CharactersItem_Mirage;
      CloneImmobile?: CharactersItem_CloneImmobile;
      ReplicateClone?: CharactersItem_ReplicateClone;
      LightningClone?: CharactersItem_LightningClone;
      Unk045?: number;
      Unk046?: number;
      SkillTreeBackground?: string;
      Clone?: CharactersItem_Clone;
      Double?: CharactersItem_Double;
      MirageWarrior?: CharactersItem_MirageWarrior;
      DoubleTwo?: CharactersItem_DoubleTwo;
      DarkExile?: CharactersItem_DarkExile;
      Attr?: string;
      AttrLowercase?: string;
      Script?: string;
      Unk056?: CharactersItem_Unk056;
      Unk057?: number;
      Unk058?: number;
      Unk059?: number;
      Unk060?: number;
      Unk061?: number;
      Unk062?: number;
      Unk063?: CharactersItem_Unk063;
      Unk064?: number;
      Unk065?: number;
      Unk066?: number;
      Unk067?: number;
    }
    export interface CharactersItem_Unk015Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface CharactersItem_Unk015 extends Array<CharactersItem_Unk015Item> {}
    export interface CharactersItem_StartSkillGem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface CharactersItem_StartWeaponsItem {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_StartWeapons extends Array<CharactersItem_StartWeaponsItem> {}
    export interface CharactersItem_Unk030 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface CharactersItem_Unk031 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface CharactersItem_Mirage {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_CloneImmobile {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_ReplicateClone {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_LightningClone {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_Clone {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_Double {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_MirageWarrior {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_DoubleTwo {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_DarkExile {
      TableName?: string;
      Id?: string;
    }
    export interface CharactersItem_Unk056 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface CharactersItem_Unk063 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\characters.json */
    export interface Characters extends Array<CharactersItem> {}
    
    export interface CharacterstartqueststateItem {
      Id?: string;
      QuestKeys?: any[];
      QuestStates?: CharacterstartqueststateItem_QuestStates;
      Unk003?: any[];
      MapPinsKeys?: any[];
      Unk005?: any[];
      Unk006?: any[];
    }
    export interface CharacterstartqueststateItem_QuestStatesItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface CharacterstartqueststateItem_QuestStates extends Array<CharacterstartqueststateItem_QuestStatesItem> {}
    /** Source: data\characterstartqueststate.json */
    export interface Characterstartqueststate extends Array<CharacterstartqueststateItem> {}
    
    export interface CharacterstartstatesItem {
      Id?: string;
      Description?: string;
      CharactersKey?: CharacterstartstatesItem_CharactersKey;
      Level?: number;
      PassiveSkillsKeys?: any[];
      CharacterStartStateSetKey?: CharacterstartstatesItem_CharacterStartStateSetKey;
      Unk006?: CharacterstartstatesItem_Unk006;
      CharacterStartQuestStateKeys?: any[];
      Unk008?: boolean;
      InfoText?: string;
      Unk010?: any;
    }
    export interface CharacterstartstatesItem_CharactersKey {
      TableName?: string;
      Id?: string;
    }
    export interface CharacterstartstatesItem_CharacterStartStateSetKey {
      TableName?: string;
      Id?: string;
    }
    export interface CharacterstartstatesItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\characterstartstates.json */
    export interface Characterstartstates extends Array<CharacterstartstatesItem> {}
    
    export interface CharacterstartstatesetItem {
      Id?: string;
    }
    /** Source: data\characterstartstateset.json */
    export interface Characterstartstateset extends Array<CharacterstartstatesetItem> {}
    
    /** Source: data\charactervariationgroups.json */
    export type Charactervariationgroups = any[];
    
    /** Source: data\chargevariations.json */
    export type Chargevariations = any[];
    
    export interface ChaticonsItem {
      Icon?: string;
      Image?: string;
    }
    /** Source: data\chaticons.json */
    export interface Chaticons extends Array<ChaticonsItem> {}
    
    export interface ChestclustersItem {
      Id?: string;
      ChestsKeys?: ChestclustersItem_ChestsKeys;
      Unk002?: number[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    export interface ChestclustersItem_ChestsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ChestclustersItem_ChestsKeys extends Array<ChestclustersItem_ChestsKeysItem> {}
    /** Source: data\chestclusters.json */
    export interface Chestclusters extends Array<ChestclustersItem> {}
    
    export interface ChesteffectsItem {
      Id?: string;
      Normal_EPKFile?: string;
      Normal_Closed_AOFile?: string;
      Normal_Open_AOFile?: string;
      Magic_EPKFile?: string;
      Unique_EPKFile?: string;
      Rare_EPKFile?: string;
      Magic_Closed_AOFile?: string;
      Unique_Closed_AOFile?: string;
      Rare_Closed_AOFile?: string;
      Magic_Open_AOFile?: string;
      Unique_Open_AOFile?: string;
      Rare_Open_AOFile?: string;
    }
    /** Source: data\chesteffects.json */
    export interface Chesteffects extends Array<ChesteffectsItem> {}
    
    export interface ChestsItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: number;
      Name?: string;
      AOFiles?: string[];
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: number;
      Unk011?: any[];
      BaseItemTypesKey?: any;
      Unk013?: boolean;
      ModsKeys?: any[];
      TagsKeys?: any[];
      ChestEffectsKey?: ChestsItem_ChestEffectsKey;
      MinLevel?: number;
      Unk018?: any;
      MaxLevel?: number;
      Corrupt_AchievementItemsKey?: any;
      CurrencyUse_AchievementItemsKey?: any;
      Encounter_AchievementItemsKeys?: any[];
      Unk023?: any;
      InheritsFrom?: any;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: any[];
      Unk028?: string;
      Unk029?: number;
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: any;
      Unk033?: any;
      Unk034?: boolean;
      Unk035?: boolean;
      Unk036?: any[];
      IsHardmode?: boolean;
      StatsHardmode?: any[];
      Unk039?: boolean;
    }
    export interface ChestsItem_ChestEffectsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\chests.json */
    export interface Chests extends Array<ChestsItem> {}
    
    /** Source: data\classpassiveskilloverrides.json */
    export type Classpassiveskilloverrides = any[];
    
    export interface ClientleagueactionItem {
      Id?: string;
      Unk001?: ClientleagueactionItem_Unk001;
      Unk002?: number;
      GamepadIcon?: string;
    }
    export interface ClientleagueactionItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\clientleagueaction.json */
    export interface Clientleagueaction extends Array<ClientleagueactionItem> {}
    
    export interface ClientstringsItem {
      Id?: string;
      Text?: string;
      XBoxText?: string;
      XBoxText2?: string;
      HASH32?: number;
      PlaystationText?: string;
    }
    /** Source: data\clientstrings.json */
    export interface Clientstrings extends Array<ClientstringsItem> {}
    
    /** Source: data\clientstrings2.json */
    export type Clientstrings2 = any[];
    
    export interface CloneshotItem {
      Id?: number;
      MonsterVarietiesKey?: any;
      MiscAnimated1?: any;
      MiscAnimated2?: any;
      MiscAnimated3?: any;
    }
    /** Source: data\cloneshot.json */
    export interface Cloneshot extends Array<CloneshotItem> {}
    
    export interface ColoursItem {
      Item?: string;
      Red?: number;
      Green?: number;
      Blue?: number;
      RgbCode?: string;
    }
    /** Source: data\colours.json */
    export interface Colours extends Array<ColoursItem> {}
    
    /** Source: data\combatuiprompts.json */
    export type Combatuiprompts = any[];
    
    export interface CommandsItem {
      Id?: string;
      Command?: string;
      Unk002?: boolean;
      EnglishCommand?: string;
      Description?: string;
      Unk005?: boolean;
    }
    /** Source: data\commands.json */
    export interface Commands extends Array<CommandsItem> {}
    
    /** Source: data\completionnotifications.json */
    export type Completionnotifications = any[];
    
    export interface ComponentchargesItem {
      BaseItemTypesKey?: string;
      MaxCharges?: number;
      PerCharge?: number;
      MaxCharges2?: number;
      PerCharge2?: number;
    }
    /** Source: data\componentcharges.json */
    export interface Componentcharges extends Array<ComponentchargesItem> {}
    
    export interface ConditionalachievementsItem {
      Unk000?: ConditionalachievementsItem_Unk000;
      Unk001?: number;
      Unk002?: number;
    }
    export interface ConditionalachievementsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\conditionalachievements.json */
    export interface Conditionalachievements extends Array<ConditionalachievementsItem> {}
    
    export interface CoreleaguesItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: CoreleaguesItem_Unk003;
      Unk004?: any[];
      Unk005?: CoreleaguesItem_Unk005;
      Unk006?: CoreleaguesItem_Unk006;
      Unk007?: any;
      Unk008?: CoreleaguesItem_Unk008;
      Unk009?: CoreleaguesItem_Unk009;
      Unk010?: any;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any[];
    }
    export interface CoreleaguesItem_Unk003 {
      TableName?: string;
      Id?: string;
    }
    export interface CoreleaguesItem_Unk005 {
      TableName?: string;
      Id?: string;
    }
    export interface CoreleaguesItem_Unk006 {
      TableName?: string;
      Id?: string;
    }
    export interface CoreleaguesItem_Unk008Item {
      TableName?: string;
      Id?: string;
    }
    export interface CoreleaguesItem_Unk008 extends Array<CoreleaguesItem_Unk008Item> {}
    export interface CoreleaguesItem_Unk009 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\coreleagues.json */
    export interface Coreleagues extends Array<CoreleaguesItem> {}
    
    /** Source: data\corpseexplosiongibs.json */
    export type Corpseexplosiongibs = any[];
    
    export interface CorpsesinkvariationsItem {
      Id?: string;
      AOFile?: string;
      EPKFile?: string;
      AOFiles?: any[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
    }
    /** Source: data\corpsesinkvariations.json */
    export interface Corpsesinkvariations extends Array<CorpsesinkvariationsItem> {}
    
    export interface CosmeticsequippanelmodeItem {
      Id?: string;
      Unk001?: number[];
    }
    /** Source: data\cosmeticsequippanelmode.json */
    export interface Cosmeticsequippanelmode extends Array<CosmeticsequippanelmodeItem> {}
    
    export interface CosttypesItem {
      Id?: string;
      StatsKey?: CosttypesItem_StatsKey;
      FormatText?: string;
      Unk003?: number;
    }
    export interface CosttypesItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\costtypes.json */
    export interface Costtypes extends Array<CosttypesItem> {}
    
    /** Source: data\craftablemodtypes.json */
    export type Craftablemodtypes = any[];
    
    /** Source: data\craftingbenchoptions.json */
    export type Craftingbenchoptions = any[];
    
    /** Source: data\craftingbenchsortcategories.json */
    export type Craftingbenchsortcategories = any[];
    
    export interface CraftingbenchspecificoptionidItem {
      Unk000?: string;
      Unk001?: CraftingbenchspecificoptionidItem_Unk001;
    }
    export interface CraftingbenchspecificoptionidItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\craftingbenchspecificoptionid.json */
    export interface Craftingbenchspecificoptionid extends Array<CraftingbenchspecificoptionidItem> {}
    
    export interface CraftingbenchunlockcategoriesItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number[];
      UnlockType?: string;
      CraftingItemClassCategories?: CraftingbenchunlockcategoriesItem_CraftingItemClassCategories;
      ObtainingDescription?: string;
    }
    export interface CraftingbenchunlockcategoriesItem_CraftingItemClassCategoriesItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface CraftingbenchunlockcategoriesItem_CraftingItemClassCategories extends Array<CraftingbenchunlockcategoriesItem_CraftingItemClassCategoriesItem> {}
    /** Source: data\craftingbenchunlockcategories.json */
    export interface Craftingbenchunlockcategories extends Array<CraftingbenchunlockcategoriesItem> {}
    
    /** Source: data\craftingitemclasscategories.json */
    export type Craftingitemclasscategories = any[];
    
    /** Source: data\crossbowskillboltoverride.json */
    export type Crossbowskillboltoverride = any[];
    
    export interface CurrencyexchangeItem {
      Item?: CurrencyexchangeItem_Item;
      Category?: CurrencyexchangeItem_Category;
      SubCategory?: CurrencyexchangeItem_SubCategory;
      Unk003?: boolean;
      EnabledInChallengeLeague?: boolean;
      GoldPurchaseFee?: number;
      Unk006?: boolean;
    }
    export interface CurrencyexchangeItem_Item {
      TableName?: string;
      Id?: string;
    }
    export interface CurrencyexchangeItem_Category {
      TableName?: string;
      Id?: string;
    }
    export interface CurrencyexchangeItem_SubCategory {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\currencyexchange.json */
    export interface Currencyexchange extends Array<CurrencyexchangeItem> {}
    
    export interface CurrencyexchangecategoriesItem {
      Id?: string;
      Name?: string;
    }
    /** Source: data\currencyexchangecategories.json */
    export interface Currencyexchangecategories extends Array<CurrencyexchangecategoriesItem> {}
    
    export interface CurrencyitemsItem {
      BaseItemTypesKey?: CurrencyitemsItem_BaseItemTypesKey;
      StackSize?: number;
      CurrencyUseType?: number;
      Action?: string;
      Directions?: string;
      FullStack_BaseItemTypesKey?: any;
      Description?: string;
      Usage_AchievementItemsKeys?: any[];
      Scroll?: boolean;
      Possession_AchievementItemsKey?: CurrencyitemsItem_Possession_AchievementItemsKey;
      Unk010?: any[];
      Unk011?: any[];
      CurrencyTab_StackSize?: number;
      XBoxDirections?: string;
      Unk014?: number;
      ModifyMapsAchievements?: any[];
      ModifyContractsAchievements?: any[];
      CombineAchievements?: any[];
      ChangedForHardmode?: boolean;
      DescriptionHardmode?: string;
      IsGold?: boolean;
      Unk021?: boolean;
    }
    export interface CurrencyitemsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface CurrencyitemsItem_Possession_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\currencyitems.json */
    export interface Currencyitems extends Array<CurrencyitemsItem> {}
    
    export interface CurrencystashtablayoutItem {
      Id?: string;
      StoredItem?: CurrencystashtablayoutItem_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      ShowIfEmpty?: boolean;
      SlotGroup?: number;
    }
    export interface CurrencystashtablayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\currencystashtablayout.json */
    export interface Currencystashtablayout extends Array<CurrencystashtablayoutItem> {}
    
    export interface CurrencyuseeffectsItem {
      Unk000?: CurrencyuseeffectsItem_Unk000;
      Unk001?: number;
      BK2File?: string;
      SoundFile?: string;
      Unk004?: boolean;
      BK2File2?: string;
      Unk006?: boolean;
      Unk007?: any;
      Unk008?: number;
    }
    export interface CurrencyuseeffectsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\currencyuseeffects.json */
    export interface Currencyuseeffects extends Array<CurrencyuseeffectsItem> {}
    
    /** Source: data\customleaguemonsterreplacements.json */
    export type Customleaguemonsterreplacements = any[];
    
    /** Source: data\customleagueroomreplacements.json */
    export type Customleagueroomreplacements = any[];
    
    export interface DaemonspawningdataItem {
      Id?: string;
      MonsterVarieties?: DaemonspawningdataItem_MonsterVarieties;
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: number;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
    }
    export interface DaemonspawningdataItem_MonsterVarietiesItem {
      TableName?: string;
      Id?: string;
    }
    export interface DaemonspawningdataItem_MonsterVarieties extends Array<DaemonspawningdataItem_MonsterVarietiesItem> {}
    /** Source: data\daemonspawningdata.json */
    export interface Daemonspawningdata extends Array<DaemonspawningdataItem> {}
    
    /** Source: data\damagecalculationtypes.json */
    export type Damagecalculationtypes = any[];
    
    export interface DamageeffectvariationsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      Unk003?: boolean;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any;
    }
    /** Source: data\damageeffectvariations.json */
    export interface Damageeffectvariations extends Array<DamageeffectvariationsItem> {}
    
    export interface DamagehiteffectsItem {
      Id?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number[];
      Unk004?: any[];
    }
    /** Source: data\damagehiteffects.json */
    export interface Damagehiteffects extends Array<DamagehiteffectsItem> {}
    
    /** Source: data\damageparticleeffects.json */
    export type Damageparticleeffects = any[];
    
    export interface DamagewhenhiteffectsItem {
      Unk000?: DamagewhenhiteffectsItem_Unk000;
      Unk001?: DamagewhenhiteffectsItem_Unk001;
      Unk002?: boolean;
    }
    export interface DamagewhenhiteffectsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface DamagewhenhiteffectsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\damagewhenhiteffects.json */
    export interface Damagewhenhiteffects extends Array<DamagewhenhiteffectsItem> {}
    
    /** Source: data\dances.json */
    export type Dances = any[];
    
    /** Source: data\daressopitfights.json */
    export type Daressopitfights = any[];
    
    export interface DefaultmonsterstatsItem {
      DisplayLevel?: string;
      Damage?: number;
      Evasion?: number;
      Accuracy?: number;
      Life?: number;
      Experience?: number;
      AllyLife?: number;
      Unk007?: number;
      Difficulty?: number;
      Damage2?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Armour?: number;
    }
    /** Source: data\defaultmonsterstats.json */
    export interface Defaultmonsterstats extends Array<DefaultmonsterstatsItem> {}
    
    export interface DeliriumstashtablayoutItem {
      Id?: string;
      StoredItem?: DeliriumstashtablayoutItem_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk008?: boolean;
    }
    export interface DeliriumstashtablayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\deliriumstashtablayout.json */
    export interface Deliriumstashtablayout extends Array<DeliriumstashtablayoutItem> {}
    
    export interface DelveazuriteshopItem {
      BaseItemTypesKey?: DelveazuriteshopItem_BaseItemTypesKey;
      SpawnWeight?: number;
      Cost?: number;
      MinDepth?: number;
      IsResonator?: boolean;
      Unk005?: number;
      Unk006?: number;
    }
    export interface DelveazuriteshopItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\delveazuriteshop.json */
    export interface Delveazuriteshop extends Array<DelveazuriteshopItem> {}
    
    /** Source: data\delvebiomes.json */
    export type Delvebiomes = any[];
    
    export interface DelvecatchupdepthsItem {
      Level?: number;
      Depth?: number;
    }
    /** Source: data\delvecatchupdepths.json */
    export interface Delvecatchupdepths extends Array<DelvecatchupdepthsItem> {}
    
    export interface DelvecraftingmodifierdescriptionsItem {
      Id?: string;
      Description?: string;
    }
    /** Source: data\delvecraftingmodifierdescriptions.json */
    export interface Delvecraftingmodifierdescriptions extends Array<DelvecraftingmodifierdescriptionsItem> {}
    
    export interface DelvecraftingmodifiersItem {
      BaseItemTypesKey?: DelvecraftingmodifiersItem_BaseItemTypesKey;
      AddedModsKeys?: any[];
      NegativeWeight_TagsKeys?: DelvecraftingmodifiersItem_NegativeWeight_TagsKeys;
      NegativeWeight_Values?: number[];
      ForcedAddModsKeys?: any[];
      ForbiddenDelveCraftingTagsKeys?: any[];
      AllowedDelveCraftingTagsKeys?: any[];
      CanMirrorItem?: boolean;
      CorruptedEssenceChance?: number;
      CanImproveQuality?: boolean;
      HasLuckyRolls?: boolean;
      SellPrice_ModsKeys?: any[];
      CanRollWhiteSockets?: boolean;
      Weight_TagsKeys?: DelvecraftingmodifiersItem_Weight_TagsKeys;
      Weight_Values?: number[];
      DelveCraftingModifierDescriptionsKeys?: DelvecraftingmodifiersItem_DelveCraftingModifierDescriptionsKeys;
      BlockedDelveCraftingModifierDescriptionsKeys?: DelvecraftingmodifiersItem_BlockedDelveCraftingModifierDescriptionsKeys;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: number[];
      Unk020?: number[];
    }
    export interface DelvecraftingmodifiersItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface DelvecraftingmodifiersItem_NegativeWeight_TagsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface DelvecraftingmodifiersItem_NegativeWeight_TagsKeys extends Array<DelvecraftingmodifiersItem_NegativeWeight_TagsKeysItem> {}
    export interface DelvecraftingmodifiersItem_Weight_TagsKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface DelvecraftingmodifiersItem_Weight_TagsKeys extends Array<DelvecraftingmodifiersItem_Weight_TagsKeysItem> {}
    export interface DelvecraftingmodifiersItem_DelveCraftingModifierDescriptionsKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface DelvecraftingmodifiersItem_DelveCraftingModifierDescriptionsKeys extends Array<DelvecraftingmodifiersItem_DelveCraftingModifierDescriptionsKeysItem> {}
    export interface DelvecraftingmodifiersItem_BlockedDelveCraftingModifierDescriptionsKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface DelvecraftingmodifiersItem_BlockedDelveCraftingModifierDescriptionsKeys extends Array<DelvecraftingmodifiersItem_BlockedDelveCraftingModifierDescriptionsKeysItem> {}
    /** Source: data\delvecraftingmodifiers.json */
    export interface Delvecraftingmodifiers extends Array<DelvecraftingmodifiersItem> {}
    
    export interface DelvecraftingtagsItem {
      TagsKey?: DelvecraftingtagsItem_TagsKey;
      ItemClass?: string;
    }
    export interface DelvecraftingtagsItem_TagsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\delvecraftingtags.json */
    export interface Delvecraftingtags extends Array<DelvecraftingtagsItem> {}
    
    export interface DelvedynamiteItem {
      Unk000?: number;
      ProjectilesKey?: DelvedynamiteItem_ProjectilesKey;
      Unk002?: any;
      Dynamite_MiscObjectsKey?: any;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      MiscAnimatedKey?: DelvedynamiteItem_MiscAnimatedKey;
      Unk012?: number;
    }
    export interface DelvedynamiteItem_ProjectilesKey {
      TableName?: string;
      Id?: string;
    }
    export interface DelvedynamiteItem_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\delvedynamite.json */
    export interface Delvedynamite extends Array<DelvedynamiteItem> {}
    
    export interface DelvefeaturesItem {
      Id?: string;
      Name?: string;
      SpawnWeight?: number[];
      WorldAreasKey?: any;
      Image?: string;
      AchievementItemsKeys?: any[];
      Unk006?: any[];
      MinDepth?: any[];
      Description?: string;
      Unk009?: number;
      Unk010?: any[];
      Unk011?: number[];
      Unk012?: any[];
      Unk013?: number[];
    }
    /** Source: data\delvefeatures.json */
    export interface Delvefeatures extends Array<DelvefeaturesItem> {}
    
    export interface DelveflaresItem {
      Unk000?: number;
      Unk001?: DelveflaresItem_Unk001;
      Unk002?: any;
      Unk003?: number;
      Unk004?: any;
      Unk005?: number;
      Unk006?: number;
    }
    export interface DelveflaresItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\delveflares.json */
    export interface Delveflares extends Array<DelveflaresItem> {}
    
    export interface DelvelevelscalingItem {
      Depth?: number;
      MonsterLevel?: number;
      Unk002?: number;
      SulphiteCost?: number;
      MonsterLevel2?: number;
      MoreMonsterDamage?: number;
      MoreMonsterLife?: number;
      DarknessResistance?: number;
      LightRadius?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    /** Source: data\delvelevelscaling.json */
    export interface Delvelevelscaling extends Array<DelvelevelscalingItem> {}
    
    /** Source: data\delvemonsterspawners.json */
    export type Delvemonsterspawners = any[];
    
    export interface DelveresourceperlevelItem {
      AreaLevel?: number;
      Sulphite?: number;
    }
    /** Source: data\delveresourceperlevel.json */
    export interface Delveresourceperlevel extends Array<DelveresourceperlevelItem> {}
    
    export interface DelverewardtierconstantsItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    /** Source: data\delverewardtierconstants.json */
    export interface Delverewardtierconstants extends Array<DelverewardtierconstantsItem> {}
    
    export interface DelverobotvariationsItem {
      Id?: string;
      AOFile?: string;
      Unk002?: string[];
      Unk003?: any;
      Unk004?: DelverobotvariationsItem_Unk004;
    }
    export interface DelverobotvariationsItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\delverobotvariations.json */
    export interface Delverobotvariations extends Array<DelverobotvariationsItem> {}
    
    /** Source: data\delverooms.json */
    export type Delverooms = any[];
    
    export interface DelvestashtablayoutItem {
      Id?: string;
      StoredItem?: DelvestashtablayoutItem_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      HideIfEmpty?: boolean;
      Image?: string;
    }
    export interface DelvestashtablayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\delvestashtablayout.json */
    export interface Delvestashtablayout extends Array<DelvestashtablayoutItem> {}
    
    export interface DelveupgradesItem {
      DelveUpgradeTypeKey?: number;
      UpgradeLevel?: number;
      StatsKeys?: any[];
      StatValues?: any[];
      Cost?: number;
      Unk005?: number;
      AchievementItemsKey?: any;
      Unk007?: number;
    }
    /** Source: data\delveupgrades.json */
    export interface Delveupgrades extends Array<DelveupgradesItem> {}
    
    /** Source: data\destructivedamageeffects.json */
    export type Destructivedamageeffects = any[];
    
    export interface DialogueeventItem {
      Id?: string;
      Timer?: number;
    }
    /** Source: data\dialogueevent.json */
    export interface Dialogueevent extends Array<DialogueeventItem> {}
    
    /** Source: data\displayminionmonstertype.json */
    export type Displayminionmonstertype = any[];
    
    /** Source: data\divinationcardart.json */
    export type Divinationcardart = any[];
    
    /** Source: data\divinationcardstashtablayout.json */
    export type Divinationcardstashtablayout = any[];
    
    export interface DoorsItem {
      Id?: string;
      Unk001?: boolean;
    }
    /** Source: data\doors.json */
    export interface Doors extends Array<DoorsItem> {}
    
    /** Source: data\dronebasetypes.json */
    export type Dronebasetypes = any[];
    
    export interface DronetypesItem {
      Id?: string;
      Unk001?: DronetypesItem_Unk001;
      Unk002?: DronetypesItem_Unk002;
      DeployText?: string;
      Unk004?: string;
      UnlockedStat?: DronetypesItem_UnlockedStat;
      SocketableText?: string;
      NotPoweredText?: string;
    }
    export interface DronetypesItem_Unk001 {
      TableName?: string;
      Id?: string;
    }
    export interface DronetypesItem_Unk002 {
      TableName?: string;
      Id?: string;
    }
    export interface DronetypesItem_UnlockedStat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\dronetypes.json */
    export interface Dronetypes extends Array<DronetypesItem> {}
    
    export interface DropeffectsItem {
      Id?: string;
      AOFile?: string;
    }
    /** Source: data\dropeffects.json */
    export interface Dropeffects extends Array<DropeffectsItem> {}
    
    /** Source: data\dynamicstashslots.json */
    export type Dynamicstashslots = any[];
    
    export interface EclipsemodsItem {
      Key?: string;
      SpawnWeight_TagsKeys?: EclipsemodsItem_SpawnWeight_TagsKeys;
      SpawnWeight_Values?: number[];
      ModsKey?: EclipsemodsItem_ModsKey;
      MinLevel?: number;
      MaxLevel?: number;
      IsPrefix?: boolean;
    }
    export interface EclipsemodsItem_SpawnWeight_TagsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface EclipsemodsItem_SpawnWeight_TagsKeys extends Array<EclipsemodsItem_SpawnWeight_TagsKeysItem> {}
    export interface EclipsemodsItem_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\eclipsemods.json */
    export interface Eclipsemods extends Array<EclipsemodsItem> {}
    
    export interface EffectdrivenskillItem {
      Unk000?: number;
      Unk001?: EffectdrivenskillItem_Unk001;
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: boolean;
      Unk026?: number;
      Unk027?: number;
      Unk028?: number;
    }
    export interface EffectdrivenskillItem_Unk001Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface EffectdrivenskillItem_Unk001 extends Array<EffectdrivenskillItem_Unk001Item> {}
    /** Source: data\effectdrivenskill.json */
    export interface Effectdrivenskill extends Array<EffectdrivenskillItem> {}
    
    export interface EffectivenesscostconstantsItem {
      Id?: string;
      Multiplier?: number;
    }
    /** Source: data\effectivenesscostconstants.json */
    export interface Effectivenesscostconstants extends Array<EffectivenesscostconstantsItem> {}
    
    export interface EinharmissionsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    /** Source: data\einharmissions.json */
    export interface Einharmissions extends Array<EinharmissionsItem> {}
    
    export interface EinharpackfallbackItem {
      Unk000?: EinharpackfallbackItem_Unk000;
      Unk001?: any[];
    }
    export interface EinharpackfallbackItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\einharpackfallback.json */
    export interface Einharpackfallback extends Array<EinharpackfallbackItem> {}
    
    /** Source: data\elderbossarenas.json */
    export type Elderbossarenas = any[];
    
    export interface ElderguardiansItem {
      Id?: string;
      MapIcon?: string;
    }
    /** Source: data\elderguardians.json */
    export interface Elderguardians extends Array<ElderguardiansItem> {}
    
    /** Source: data\eldermapbossoverride.json */
    export type Eldermapbossoverride = any[];
    
    /** Source: data\endgamecorruptionmods.json */
    export type Endgamecorruptionmods = any[];
    
    /** Source: data\endgamemapbiomes.json */
    export type Endgamemapbiomes = any[];
    
    /** Source: data\endgamemapcompletionquests.json */
    export type Endgamemapcompletionquests = any[];
    
    /** Source: data\endgamemapcontent.json */
    export type Endgamemapcontent = any[];
    
    /** Source: data\endgamemapcontentset.json */
    export type Endgamemapcontentset = any[];
    
    /** Source: data\endgamemapdecorations.json */
    export type Endgamemapdecorations = any[];
    
    /** Source: data\endgamemappins.json */
    export type Endgamemappins = any[];
    
    /** Source: data\endgamemaps.json */
    export type Endgamemaps = any[];
    
    /** Source: data\environmentfootprints.json */
    export type Environmentfootprints = any[];
    
    export interface EnvironmentsItem {
      Id?: string;
      Base_ENVFile?: string;
      Corrupted_ENVFiles?: any[];
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: any[];
      EnvironmentTransitionsKey?: any;
      PreloadGroup?: any;
    }
    /** Source: data\environments.json */
    export interface Environments extends Array<EnvironmentsItem> {}
    
    export interface EnvironmenttransitionsItem {
      Id?: string;
      OTFiles?: string[];
      Unk002?: string[];
    }
    /** Source: data\environmenttransitions.json */
    export interface Environmenttransitions extends Array<EnvironmenttransitionsItem> {}
    
    /** Source: data\essences.json */
    export type Essences = any[];
    
    export interface EssencestashtablayoutItem {
      Id?: string;
      StoredItem?: EssencestashtablayoutItem_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      IsUpgradableEssenceSlot?: boolean;
    }
    export interface EssencestashtablayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\essencestashtablayout.json */
    export interface Essencestashtablayout extends Array<EssencestashtablayoutItem> {}
    
    /** Source: data\essencetype.json */
    export type Essencetype = any[];
    
    /** Source: data\eventcoins.json */
    export type Eventcoins = any[];
    
    export interface EvergreenachievementsItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: EvergreenachievementsItem_Unk002;
    }
    export interface EvergreenachievementsItem_Unk002Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface EvergreenachievementsItem_Unk002 extends Array<EvergreenachievementsItem_Unk002Item> {}
    /** Source: data\evergreenachievements.json */
    export interface Evergreenachievements extends Array<EvergreenachievementsItem> {}
    
    export interface ExecutegealItem {
      Unk000?: number;
      Unk001?: number;
      MiscAnimated?: ExecutegealItem_MiscAnimated;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: any[];
      Unk014?: boolean;
      Unk015?: number;
      Unk016?: ExecutegealItem_Unk016;
      Unk017?: boolean;
      Script?: string;
      Unk019?: boolean;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: number;
      Unk023?: number;
      Unk024?: boolean;
      Unk025?: number;
      MetadataIDs?: any[];
      ScriptCommand?: string;
      Unk028?: number[];
      Unk029?: number[];
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: number[];
      Unk033?: boolean;
      Unk034?: number;
      Unk035?: boolean;
      Unk036?: number;
      Unk037?: boolean;
      Unk038?: number;
      Unk039?: number;
      Unk040?: number;
    }
    export interface ExecutegealItem_MiscAnimatedItem {
      TableName?: string;
      Id?: string;
    }
    export interface ExecutegealItem_MiscAnimated extends Array<ExecutegealItem_MiscAnimatedItem> {}
    export interface ExecutegealItem_Unk016 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\executegeal.json */
    export interface Executegeal extends Array<ExecutegealItem> {}
    
    export interface ExpandingpulseItem {
      IntId?: number;
      StringId?: string;
      Unk002?: number[];
      Unk003?: number[];
      Unk004?: ExpandingpulseItem_Unk004;
      Unk005?: number;
      Unk006?: number;
      Unk007?: boolean;
    }
    export interface ExpandingpulseItem_Unk004Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ExpandingpulseItem_Unk004 extends Array<ExpandingpulseItem_Unk004Item> {}
    /** Source: data\expandingpulse.json */
    export interface Expandingpulse extends Array<ExpandingpulseItem> {}
    
    export interface ExpeditionareasItem {
      Area?: ExpeditionareasItem_Area;
      PosX?: number;
      PosY?: number;
      Tags?: ExpeditionareasItem_Tags;
      Unk004?: number[];
      Unk005?: boolean;
      TextAudio?: ExpeditionareasItem_TextAudio;
      CompletionAchievements?: any[];
    }
    export interface ExpeditionareasItem_Area {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionareasItem_TagsItem {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionareasItem_Tags extends Array<ExpeditionareasItem_TagsItem> {}
    export interface ExpeditionareasItem_TextAudio {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionareas.json */
    export interface Expeditionareas extends Array<ExpeditionareasItem> {}
    
    export interface ExpeditionbalanceperlevelItem {
      Level?: number;
      Unk001?: boolean;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
    }
    /** Source: data\expeditionbalanceperlevel.json */
    export interface Expeditionbalanceperlevel extends Array<ExpeditionbalanceperlevelItem> {}
    
    /** Source: data\expeditioncurrency.json */
    export type Expeditioncurrency = any[];
    
    /** Source: data\expeditiondeals.json */
    export type Expeditiondeals = any[];
    
    /** Source: data\expeditiondealsdialogue.json */
    export type Expeditiondealsdialogue = any[];
    
    export interface ExpeditionfactionsItem {
      Id?: string;
      Name?: string;
      FactionFlag?: string;
      Unk003?: number;
      FactionIcon?: string;
      MonsterVarieties?: ExpeditionfactionsItem_MonsterVarieties;
      Progress1?: ExpeditionfactionsItem_Progress1;
      Progress2Vaal?: ExpeditionfactionsItem_Progress2Vaal;
      Progress3Final?: ExpeditionfactionsItem_Progress3Final;
      Tags?: ExpeditionfactionsItem_Tags;
    }
    export interface ExpeditionfactionsItem_MonsterVarieties {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionfactionsItem_Progress1 {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionfactionsItem_Progress2Vaal {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionfactionsItem_Progress3Final {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionfactionsItem_Tags {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionfactions.json */
    export interface Expeditionfactions extends Array<ExpeditionfactionsItem> {}
    
    export interface ExpeditionmarkerscommonItem {
      Id?: string;
      AOFile?: string;
    }
    /** Source: data\expeditionmarkerscommon.json */
    export interface Expeditionmarkerscommon extends Array<ExpeditionmarkerscommonItem> {}
    
    export interface ExpeditionnpcsItem {
      Id?: string;
      NPCs?: ExpeditionnpcsItem_NPCs;
      RerollItem?: ExpeditionnpcsItem_RerollItem;
      Unk003?: number;
      Unk004?: number;
      Unk005?: ExpeditionnpcsItem_Unk005;
      Faction?: ExpeditionnpcsItem_Faction;
      Reroll?: ExpeditionnpcsItem_Reroll;
      AllBombsPlaced?: ExpeditionnpcsItem_AllBombsPlaced;
      BombPlacedRemnant?: ExpeditionnpcsItem_BombPlacedRemnant;
      BombPlacedTreasure?: ExpeditionnpcsItem_BombPlacedTreasure;
      BombPlacedMonsters?: ExpeditionnpcsItem_BombPlacedMonsters;
      BombPlacedGeneric?: ExpeditionnpcsItem_BombPlacedGeneric;
      EncounterComplete?: ExpeditionnpcsItem_EncounterComplete;
      Unk014?: number;
      Unk015?: number;
    }
    export interface ExpeditionnpcsItem_NPCsItem {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_NPCs extends Array<ExpeditionnpcsItem_NPCsItem> {}
    export interface ExpeditionnpcsItem_RerollItem {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_Unk005 {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_Faction {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_Reroll {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_AllBombsPlaced {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_BombPlacedRemnant {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_BombPlacedTreasure {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_BombPlacedMonsters {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_BombPlacedGeneric {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionnpcsItem_EncounterComplete {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionnpcs.json */
    export interface Expeditionnpcs extends Array<ExpeditionnpcsItem> {}
    
    export interface ExpeditionrelicmodsItem {
      Mod?: ExpeditionrelicmodsItem_Mod;
      Categories?: number[];
      DestroyAchievements?: any[];
    }
    export interface ExpeditionrelicmodsItem_Mod {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionrelicmods.json */
    export interface Expeditionrelicmods extends Array<ExpeditionrelicmodsItem> {}
    
    export interface ExpeditionrelicsItem {
      Id?: string;
      Name?: string;
      ItemTag?: ExpeditionrelicsItem_ItemTag;
      AOFile?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    export interface ExpeditionrelicsItem_ItemTag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionrelics.json */
    export interface Expeditionrelics extends Array<ExpeditionrelicsItem> {}
    
    export interface ExpeditionterrainfeaturesItem {
      Id?: string;
      ExtraFeature?: ExpeditionterrainfeaturesItem_ExtraFeature;
      ExpeditionFaction?: any;
      MinLevel?: number;
      MaxLevel?: number;
      Unk005?: number;
      Area?: ExpeditionterrainfeaturesItem_Area;
      ExpeditionAreas?: any[];
      Unk008?: number;
      Unk009?: boolean;
      UnearthAchievements?: any[];
    }
    export interface ExpeditionterrainfeaturesItem_ExtraFeature {
      TableName?: string;
      Id?: string;
    }
    export interface ExpeditionterrainfeaturesItem_Area {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\expeditionterrainfeatures.json */
    export interface Expeditionterrainfeatures extends Array<ExpeditionterrainfeaturesItem> {}
    
    export interface ExperiencelevelsItem {
      Unk000?: string;
      Level?: number;
      Experience?: number;
    }
    /** Source: data\experiencelevels.json */
    export interface Experiencelevels extends Array<ExperiencelevelsItem> {}
    
    /** Source: data\explodingstormbuffs.json */
    export type Explodingstormbuffs = any[];
    
    /** Source: data\fixedhideoutdoodadtypes.json */
    export type Fixedhideoutdoodadtypes = any[];
    
    /** Source: data\fixedmissions.json */
    export type Fixedmissions = any[];
    
    /** Source: data\flasks.json */
    export type Flasks = any[];
    
    /** Source: data\flaskstashbasetypeordering.json */
    export type Flaskstashbasetypeordering = any[];
    
    export interface FootprintsItem {
      Id?: string;
      Active_AOFiles?: string[];
      Idle_AOFiles?: string[];
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number;
      Unk006?: any;
    }
    /** Source: data\footprints.json */
    export interface Footprints extends Array<FootprintsItem> {}
    
    export interface FootstepaudioItem {
      Id?: string;
      Index?: number;
    }
    /** Source: data\footstepaudio.json */
    export interface Footstepaudio extends Array<FootstepaudioItem> {}
    
    export interface FragmentstashtablayoutItem {
      Id?: string;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      Unk006?: boolean;
      Tab?: number;
      SlotSize?: number;
      HideIfEmpty?: boolean;
      Subtab?: number;
      StoredItems?: FragmentstashtablayoutItem_StoredItems;
      Unk012?: boolean;
      Unk013?: string;
      Unk014?: number;
    }
    export interface FragmentstashtablayoutItem_StoredItemsItem {
      TableName?: string;
      Id?: string;
    }
    export interface FragmentstashtablayoutItem_StoredItems extends Array<FragmentstashtablayoutItem_StoredItemsItem> {}
    /** Source: data\fragmentstashtablayout.json */
    export interface Fragmentstashtablayout extends Array<FragmentstashtablayoutItem> {}
    
    /** Source: data\gambleprices.json */
    export type Gambleprices = any[];
    
    export interface GameconstantsItem {
      Id?: string;
      Value?: number;
      Unk002?: number;
    }
    /** Source: data\gameconstants.json */
    export interface Gameconstants extends Array<GameconstantsItem> {}
    
    export interface GamelogosItem {
      Id?: string;
      LogoIntl?: string;
      LogoTW?: string;
    }
    /** Source: data\gamelogos.json */
    export interface Gamelogos extends Array<GamelogosItem> {}
    
    export interface GameobjecttasksItem {
      Id?: string;
      HASH16?: number;
    }
    /** Source: data\gameobjecttasks.json */
    export interface Gameobjecttasks extends Array<GameobjecttasksItem> {}
    
    export interface GameobjecttasksfromstatsItem {
      Unk000?: GameobjecttasksfromstatsItem_Unk000;
      Unk001?: GameobjecttasksfromstatsItem_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: boolean;
    }
    export interface GameobjecttasksfromstatsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface GameobjecttasksfromstatsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\gameobjecttasksfromstats.json */
    export interface Gameobjecttasksfromstats extends Array<GameobjecttasksfromstatsItem> {}
    
    export interface GamepadbuttonItem {
      Unk000?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
    }
    /** Source: data\gamepadbutton.json */
    export interface Gamepadbutton extends Array<GamepadbuttonItem> {}
    
    /** Source: data\gamepadbuttonbindaction.json */
    export type Gamepadbuttonbindaction = any[];
    
    export interface GamepadbuttoncombinationItem {
      Id?: string;
      Button1?: GamepadbuttoncombinationItem_Button1;
      Button2?: GamepadbuttoncombinationItem_Button2;
      Unk003?: number;
    }
    export interface GamepadbuttoncombinationItem_Button1 {
      TableName?: string;
      RowIndex?: number;
    }
    export interface GamepadbuttoncombinationItem_Button2 {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\gamepadbuttoncombination.json */
    export interface Gamepadbuttoncombination extends Array<GamepadbuttoncombinationItem> {}
    
    /** Source: data\gamepaditemactiontypes.json */
    export type Gamepaditemactiontypes = any[];
    
    export interface GamepadthumbstickItem {
      Unk000?: string;
      Unk001?: string;
    }
    /** Source: data\gamepadthumbstick.json */
    export interface Gamepadthumbstick extends Array<GamepadthumbstickItem> {}
    
    export interface GamepadtypeItem {
      Id?: string;
      Console?: string;
      ImageFile?: string;
    }
    /** Source: data\gamepadtype.json */
    export interface Gamepadtype extends Array<GamepadtypeItem> {}
    
    export interface GamestatsItem {
      Id?: string;
      Id2?: string;
    }
    /** Source: data\gamestats.json */
    export interface Gamestats extends Array<GamestatsItem> {}
    
    export interface GemeffectsItem {
      Id?: string;
      Name?: string;
      GrantedEffect?: GemeffectsItem_GrantedEffect;
      GrantedEffectHardmode?: GemeffectsItem_GrantedEffectHardmode;
      GrantedEffect2?: GemeffectsItem_GrantedEffect2;
      GrantedEffect2Hardmode?: any;
      SupportText?: string;
      SupportName?: any;
      GemTags?: any[];
      Consumed_ModsKey?: GemeffectsItem_Consumed_ModsKey;
      ItemColor?: number;
    }
    export interface GemeffectsItem_GrantedEffect {
      TableName?: string;
      Id?: string;
    }
    export interface GemeffectsItem_GrantedEffectHardmode {
      TableName?: string;
      Id?: string;
    }
    export interface GemeffectsItem_GrantedEffect2 {
      TableName?: string;
      Id?: string;
    }
    export interface GemeffectsItem_Consumed_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\gemeffects.json */
    export interface Gemeffects extends Array<GemeffectsItem> {}
    
    /** Source: data\gemtags.json */
    export type Gemtags = any[];
    
    export interface GenericbuffaurasItem {
      Id?: string;
    }
    /** Source: data\genericbuffauras.json */
    export interface Genericbuffauras extends Array<GenericbuffaurasItem> {}
    
    export interface GenericleaguerewardtypesItem {
      Id?: string;
      MinLevel?: number;
      MaxLevel?: number;
    }
    /** Source: data\genericleaguerewardtypes.json */
    export interface Genericleaguerewardtypes extends Array<GenericleaguerewardtypesItem> {}
    
    export interface GenericleaguerewardtypevisualsItem {
      Type?: GenericleaguerewardtypevisualsItem_Type;
      Unk001?: GenericleaguerewardtypevisualsItem_Unk001;
      Unk002?: GenericleaguerewardtypevisualsItem_Unk002;
      Unk003?: number;
      Icon?: string;
      Name?: string;
    }
    export interface GenericleaguerewardtypevisualsItem_Type {
      TableName?: string;
      Id?: string;
    }
    export interface GenericleaguerewardtypevisualsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface GenericleaguerewardtypevisualsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\genericleaguerewardtypevisuals.json */
    export interface Genericleaguerewardtypevisuals extends Array<GenericleaguerewardtypevisualsItem> {}
    
    /** Source: data\genericskillindicator.json */
    export type Genericskillindicator = any[];
    
    export interface GeometryattackItem {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: any[];
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: number;
      Unk027?: boolean;
      Unk028?: any;
      Unk029?: any[];
      Unk030?: number;
      Unk031?: boolean;
      Unk032?: boolean;
      Unk033?: any;
      Unk034?: boolean;
      Unk035?: any[];
      Unk036?: boolean;
      Unk037?: boolean;
      Unk038?: any;
      Unk039?: boolean;
      Unk040?: boolean;
      Unk041?: any[];
      Unk042?: boolean;
      Unk043?: boolean;
      Unk044?: boolean;
      Unk045?: boolean;
      Unk046?: number;
      Unk047?: boolean;
      Unk048?: boolean;
      Unk049?: number;
      Unk050?: number;
      Unk051?: number;
      Unk052?: boolean;
      Unk053?: any;
      Unk054?: GeometryattackItem_Unk054;
    }
    export interface GeometryattackItem_Unk054 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\geometryattack.json */
    export interface Geometryattack extends Array<GeometryattackItem> {}
    
    export interface GeometrychannelItem {
      Id?: string;
      Unk001?: GeometrychannelItem_Unk001;
      Unk002?: GeometrychannelItem_Unk002;
      Unk003?: any;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: any;
      Unk010?: any;
      EPKFile?: string;
      Unk012?: number;
      Unk013?: number;
    }
    export interface GeometrychannelItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface GeometrychannelItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\geometrychannel.json */
    export interface Geometrychannel extends Array<GeometrychannelItem> {}
    
    export interface GeometryprojectilesItem {
      Unk000?: number;
      Unk001?: GeometryprojectilesItem_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: any;
      Unk019?: boolean;
      Unk020?: any;
      Unk021?: number;
    }
    export interface GeometryprojectilesItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\geometryprojectiles.json */
    export interface Geometryprojectiles extends Array<GeometryprojectilesItem> {}
    
    export interface GeometrytriggerItem {
      Unk000?: number;
      Unk001?: any;
      Unk002?: any;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: number;
      Unk022?: number;
      Unk023?: boolean;
      Unk024?: number;
      Unk025?: any[];
      Unk026?: number;
      Unk027?: boolean;
      Unk028?: number;
      Unk029?: boolean;
      Unk030?: boolean;
      Unk031?: number;
      Unk032?: boolean;
      Unk033?: boolean;
      Unk034?: any;
      Unk035?: boolean;
      Unk036?: boolean;
      Unk037?: boolean;
      Unk038?: number;
      Unk039?: number;
      Unk040?: number;
      Unk041?: number;
      Unk042?: boolean;
      Unk043?: number;
      Unk044?: number;
      Unk045?: GeometrytriggerItem_Unk045;
      Unk046?: number;
      Unk047?: number;
      Unk048?: number;
      Unk049?: number;
      Unk050?: number;
      Unk051?: boolean;
      Unk052?: boolean;
      Unk053?: boolean;
    }
    export interface GeometrytriggerItem_Unk045 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\geometrytrigger.json */
    export interface Geometrytrigger extends Array<GeometrytriggerItem> {}
    
    export interface GiftwrapartvariationsItem {
      Width?: number;
      Height?: number;
      Unk002?: number;
      Item?: GiftwrapartvariationsItem_Item;
    }
    export interface GiftwrapartvariationsItem_Item {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\giftwrapartvariations.json */
    export interface Giftwrapartvariations extends Array<GiftwrapartvariationsItem> {}
    
    export interface GlobalaudioconfigItem {
      Id?: string;
      Value?: number;
      Unk002?: boolean;
    }
    /** Source: data\globalaudioconfig.json */
    export interface Globalaudioconfig extends Array<GlobalaudioconfigItem> {}
    
    /** Source: data\goldbasetypeprices.json */
    export type Goldbasetypeprices = any[];
    
    /** Source: data\goldinherentskillpricesperlevel.json */
    export type Goldinherentskillpricesperlevel = any[];
    
    export interface GoldmodpricesItem {
      Id?: GoldmodpricesItem_Id;
      Value?: number;
      Weight?: number;
      Unk003?: number;
      Unk004?: number;
      Tags?: GoldmodpricesItem_Tags;
      SpawnWeight?: number[];
      Unk007?: GoldmodpricesItem_Unk007;
      Unk008?: any[];
    }
    export interface GoldmodpricesItem_Id {
      TableName?: string;
      Id?: string;
    }
    export interface GoldmodpricesItem_TagsItem {
      TableName?: string;
      Id?: string;
    }
    export interface GoldmodpricesItem_Tags extends Array<GoldmodpricesItem_TagsItem> {}
    export interface GoldmodpricesItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\goldmodprices.json */
    export interface Goldmodprices extends Array<GoldmodpricesItem> {}
    
    /** Source: data\goldrespecprices.json */
    export type Goldrespecprices = any[];
    
    /** Source: data\goldvisualidentities.json */
    export type Goldvisualidentities = any[];
    
    /** Source: data\grantedeffectlabels.json */
    export type Grantedeffectlabels = any[];
    
    export interface GrantedeffectqualitystatsItem {
      GrantedEffectsKey?: GrantedeffectqualitystatsItem_GrantedEffectsKey;
      StatsKeys?: GrantedeffectqualitystatsItem_StatsKeys;
      StatsValuesPermille?: number[];
      Unk003?: any[];
      Unk004?: any[];
    }
    export interface GrantedeffectqualitystatsItem_GrantedEffectsKey {
      TableName?: string;
      Id?: string;
    }
    export interface GrantedeffectqualitystatsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface GrantedeffectqualitystatsItem_StatsKeys extends Array<GrantedeffectqualitystatsItem_StatsKeysItem> {}
    /** Source: data\grantedeffectqualitystats.json */
    export interface Grantedeffectqualitystats extends Array<GrantedeffectqualitystatsItem> {}
    
    export interface GrantedeffectsItem {
      Id?: string;
      IsSupport?: boolean;
      AllowedActiveSkillTypes?: any[];
      SupportGemLetter?: string;
      Attribute?: number;
      AddedActiveSkillTypes?: any[];
      ExcludedActiveSkillTypes?: any[];
      SupportsGemsOnly?: boolean;
      Unk008?: number;
      Unk009?: any[];
      CannotBeSupported?: boolean;
      Unk011?: number;
      CastTime?: number;
      ActiveSkill?: GrantedeffectsItem_ActiveSkill;
      IgnoreMinionTypes?: boolean;
      Unk015?: boolean;
      AddedMinionActiveSkillTypes?: any[];
      Animation?: any;
      MultiPartAchievement?: GrantedeffectsItem_MultiPartAchievement;
      Unk019?: boolean;
      SupportWeaponRestrictions?: any[];
      RegularVariant?: GrantedeffectsItem_RegularVariant;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      StatSet?: GrantedeffectsItem_StatSet;
      Unk027?: any[];
    }
    export interface GrantedeffectsItem_ActiveSkill {
      TableName?: string;
      RowIndex?: number;
    }
    export interface GrantedeffectsItem_MultiPartAchievement {
      TableName?: string;
      RowIndex?: number;
    }
    export interface GrantedeffectsItem_RegularVariant {
      TableName?: string;
      Id?: string;
    }
    export interface GrantedeffectsItem_StatSet {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\grantedeffects.json */
    export interface Grantedeffects extends Array<GrantedeffectsItem> {}
    
    /** Source: data\grantedeffectsperlevel.json */
    export type Grantedeffectsperlevel = any[];
    
    export interface GrantedeffectstatsetsItem {
      Id?: string;
      ImplicitStats?: any;
      ConstantStats?: GrantedeffectstatsetsItem_ConstantStats;
      ConstantStatsValues?: number[];
      BaseEffectiveness?: number;
      IncrementalEffectiveness?: number;
      Unk006?: number;
    }
    export interface GrantedeffectstatsetsItem_ConstantStatsItem {
      TableName?: string;
      Id?: string;
    }
    export interface GrantedeffectstatsetsItem_ConstantStats extends Array<GrantedeffectstatsetsItem_ConstantStatsItem> {}
    /** Source: data\grantedeffectstatsets.json */
    export interface Grantedeffectstatsets extends Array<GrantedeffectstatsetsItem> {}
    
    export interface GrantedeffectstatsetsperlevelItem {
      StatSet?: GrantedeffectstatsetsperlevelItem_StatSet;
      GemLevel?: number;
      PlayerLevelReq?: number;
      SpellCritChance?: number;
      AttackCritChance?: number;
      BaseMultiplier?: number;
      DamageEffectiveness?: number;
      BaseResolvedValues?: any[];
      AdditionalStatsValues?: any[];
      GrantedEffects?: any[];
      AdditionalFlags?: any[];
      FloatStats?: any[];
      InterpolationBases?: any[];
      AdditionalStats?: any[];
      StatInterpolations?: any[];
      FloatStatsValues?: any[];
    }
    export interface GrantedeffectstatsetsperlevelItem_StatSet {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\grantedeffectstatsetsperlevel.json */
    export interface Grantedeffectstatsetsperlevel extends Array<GrantedeffectstatsetsperlevelItem> {}
    
    /** Source: data\grantedskillsocketnumbers.json */
    export type Grantedskillsocketnumbers = any[];
    
    /** Source: data\graphicalitemreceptacle.json */
    export type Graphicalitemreceptacle = any[];
    
    /** Source: data\graphicalitemreceptacleslot.json */
    export type Graphicalitemreceptacleslot = any[];
    
    export interface GroundeffectsItem {
      GroundEffectTypesKey?: GroundeffectsItem_GroundEffectTypesKey;
      Unk001?: number;
      Unk002?: number;
      Unk003?: any;
      Unk004?: number;
      Unk005?: number[];
      Unk006?: boolean;
      AOFile?: string[];
      Unk008?: string[];
      EndEffect?: string;
      Unk010?: any;
      Unk011?: any;
      Unk012?: any;
      Unk013?: any;
      Unk014?: any;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: any;
      Unk019?: any;
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
    }
    export interface GroundeffectsItem_GroundEffectTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\groundeffects.json */
    export interface Groundeffects extends Array<GroundeffectsItem> {}
    
    export interface GroundeffecttypesItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: GroundeffecttypesItem_Unk003;
      Unk004?: GroundeffecttypesItem_Unk004;
      Unk005?: any;
    }
    export interface GroundeffecttypesItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface GroundeffecttypesItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\groundeffecttypes.json */
    export interface Groundeffecttypes extends Array<GroundeffecttypesItem> {}
    
    /** Source: data\hapticevents.json */
    export type Hapticevents = any[];
    
    /** Source: data\harbingers.json */
    export type Harbingers = any[];
    
    export interface HarvestcraftcostscalingbybasetypeItem {
      Unk000?: HarvestcraftcostscalingbybasetypeItem_Unk000;
      Unk001?: HarvestcraftcostscalingbybasetypeItem_Unk001;
      Unk002?: number;
    }
    export interface HarvestcraftcostscalingbybasetypeItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface HarvestcraftcostscalingbybasetypeItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\harvestcraftcostscalingbybasetype.json */
    export interface Harvestcraftcostscalingbybasetype extends Array<HarvestcraftcostscalingbybasetypeItem> {}
    
    export interface HarvestcraftfiltersItem {
      Id?: string;
      BaseItem?: HarvestcraftfiltersItem_BaseItem;
      Name?: string;
    }
    export interface HarvestcraftfiltersItem_BaseItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\harvestcraftfilters.json */
    export interface Harvestcraftfilters extends Array<HarvestcraftfiltersItem> {}
    
    export interface HarvestcraftoptioniconsItem {
      Id?: string;
      DDSFile?: string;
    }
    /** Source: data\harvestcraftoptionicons.json */
    export interface Harvestcraftoptionicons extends Array<HarvestcraftoptioniconsItem> {}
    
    export interface HarvestcraftoptionsItem {
      Id?: string;
      Text?: string;
      Tier?: HarvestcraftoptionsItem_Tier;
      Command?: string;
      Parameters?: string;
      Unk005?: any[];
      HASH16?: number;
      Description?: string;
      IsEnchant?: boolean;
      LifeforceType?: number;
      LifeforceCost?: number;
      SacredCost?: number;
      Unk012?: boolean;
      Achievements?: HarvestcraftoptionsItem_Achievements;
      Unk014?: number;
    }
    export interface HarvestcraftoptionsItem_Tier {
      TableName?: string;
      Id?: string;
    }
    export interface HarvestcraftoptionsItem_AchievementsItem {
      TableName?: string;
      Id?: string;
    }
    export interface HarvestcraftoptionsItem_Achievements extends Array<HarvestcraftoptionsItem_AchievementsItem> {}
    /** Source: data\harvestcraftoptions.json */
    export interface Harvestcraftoptions extends Array<HarvestcraftoptionsItem> {}
    
    export interface HarvestcrafttiersItem {
      Id?: string;
      FrameImage?: string;
      FrameHighlight?: string;
    }
    /** Source: data\harvestcrafttiers.json */
    export interface Harvestcrafttiers extends Array<HarvestcrafttiersItem> {}
    
    export interface HarvestinfrastructureItem {
      Object?: string;
      Unk001?: number;
      ClientStringsKey?: any;
    }
    /** Source: data\harvestinfrastructure.json */
    export interface Harvestinfrastructure extends Array<HarvestinfrastructureItem> {}
    
    export interface HarvestlifescalingperlevelItem {
      Level?: number;
      Life?: number;
    }
    /** Source: data\harvestlifescalingperlevel.json */
    export interface Harvestlifescalingperlevel extends Array<HarvestlifescalingperlevelItem> {}
    
    /** Source: data\harvestperlevelvalues.json */
    export type Harvestperlevelvalues = any[];
    
    export interface HarvestseeditemsItem {
      Id?: number;
      BaseItem?: HarvestseeditemsItem_BaseItem;
      DropStat?: HarvestseeditemsItem_DropStat;
    }
    export interface HarvestseeditemsItem_BaseItem {
      TableName?: string;
      Id?: string;
    }
    export interface HarvestseeditemsItem_DropStat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\harvestseeditems.json */
    export interface Harvestseeditems extends Array<HarvestseeditemsItem> {}
    
    /** Source: data\harvestseeds.json */
    export type Harvestseeds = any[];
    
    /** Source: data\heistareaformationlayout.json */
    export type Heistareaformationlayout = any[];
    
    /** Source: data\heistareas.json */
    export type Heistareas = any[];
    
    export interface HeistbalanceperlevelItem {
      Level?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      HeistValueScalingKey1?: HeistbalanceperlevelItem_HeistValueScalingKey1;
      HeistValueScalingKey2?: HeistbalanceperlevelItem_HeistValueScalingKey2;
      HeistValueScalingKey3?: HeistbalanceperlevelItem_HeistValueScalingKey3;
      HeistValueScalingKey4?: HeistbalanceperlevelItem_HeistValueScalingKey4;
      HeistValueScalingKey5?: HeistbalanceperlevelItem_HeistValueScalingKey5;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      HeistValueScalingKey6?: HeistbalanceperlevelItem_HeistValueScalingKey6;
      HeistValueScalingKey7?: HeistbalanceperlevelItem_HeistValueScalingKey7;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey3 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey4 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey5 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey6 {
      TableName?: string;
      Id?: string;
    }
    export interface HeistbalanceperlevelItem_HeistValueScalingKey7 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistbalanceperlevel.json */
    export interface Heistbalanceperlevel extends Array<HeistbalanceperlevelItem> {}
    
    /** Source: data\heistchestrewardtypes.json */
    export type Heistchestrewardtypes = any[];
    
    /** Source: data\heistchests.json */
    export type Heistchests = any[];
    
    /** Source: data\heistchokepointformation.json */
    export type Heistchokepointformation = any[];
    
    export interface HeistconstantsItem {
      Id?: string;
      Value?: number;
    }
    /** Source: data\heistconstants.json */
    export interface Heistconstants extends Array<HeistconstantsItem> {}
    
    /** Source: data\heistcontracts.json */
    export type Heistcontracts = any[];
    
    export interface HeistdoodadnpcsItem {
      NPCsKey?: HeistdoodadnpcsItem_NPCsKey;
      Unk001?: any;
      Unk002?: HeistdoodadnpcsItem_Unk002;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      AOFile?: string;
      Stance?: string;
      BetrayalTargetsKey?: any;
    }
    export interface HeistdoodadnpcsItem_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistdoodadnpcsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\heistdoodadnpcs.json */
    export interface Heistdoodadnpcs extends Array<HeistdoodadnpcsItem> {}
    
    export interface HeistdoorsItem {
      Id?: string;
      Unk001?: string;
      HeistJobsKey1?: any;
      HeistJobsKey2?: any;
      Unk004?: string;
      Unk005?: any[];
      Unk006?: any[];
      Unk007?: number;
      HeistAreasKey?: any;
    }
    /** Source: data\heistdoors.json */
    export interface Heistdoors extends Array<HeistdoorsItem> {}
    
    export interface HeistequipmentItem {
      BaseItemTypesKey?: HeistequipmentItem_BaseItemTypesKey;
      RequiredJob_HeistJobsKey?: any;
      RequiredLevel?: number;
    }
    export interface HeistequipmentItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistequipment.json */
    export interface Heistequipment extends Array<HeistequipmentItem> {}
    
    export interface HeistgenerationItem {
      Level?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
    }
    /** Source: data\heistgeneration.json */
    export interface Heistgeneration extends Array<HeistgenerationItem> {}
    
    /** Source: data\heistintroareas.json */
    export type Heistintroareas = any[];
    
    export interface HeistjobsItem {
      Id?: string;
      Name?: string;
      RequiredSkillIcon?: string;
      SkillIcon?: string;
      Unk004?: number;
      Unk005?: number;
      MapIcon?: string;
      Level_StatsKey?: HeistjobsItem_Level_StatsKey;
      Alert_StatsKey?: HeistjobsItem_Alert_StatsKey;
      Alarm_StatsKey?: HeistjobsItem_Alarm_StatsKey;
      Cost_StatsKey?: HeistjobsItem_Cost_StatsKey;
      ExperienceGain_StatsKey?: HeistjobsItem_ExperienceGain_StatsKey;
      ConsoleBlueprintLegend?: string;
      Description?: string;
    }
    export interface HeistjobsItem_Level_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistjobsItem_Alert_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistjobsItem_Alarm_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistjobsItem_Cost_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistjobsItem_ExperienceGain_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistjobs.json */
    export interface Heistjobs extends Array<HeistjobsItem> {}
    
    export interface HeistjobsexperienceperlevelItem {
      HeistJobsKey?: HeistjobsexperienceperlevelItem_HeistJobsKey;
      Tier?: number;
      Experience?: number;
      MinLevel?: number;
      AchievementItemsKey?: any[];
    }
    export interface HeistjobsexperienceperlevelItem_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistjobsexperienceperlevel.json */
    export interface Heistjobsexperienceperlevel extends Array<HeistjobsexperienceperlevelItem> {}
    
    export interface HeistlocktypeItem {
      Id?: string;
      HeistJobsKey?: HeistlocktypeItem_HeistJobsKey;
      SkillIcon?: string;
    }
    export interface HeistlocktypeItem_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistlocktype.json */
    export interface Heistlocktype extends Array<HeistlocktypeItem> {}
    
    /** Source: data\heistnpcauras.json */
    export type Heistnpcauras = any[];
    
    export interface HeistnpcblueprinttypesItem {
      NPCsKey?: HeistnpcblueprinttypesItem_NPCsKey;
      Unk001?: number;
    }
    export interface HeistnpcblueprinttypesItem_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistnpcblueprinttypes.json */
    export interface Heistnpcblueprinttypes extends Array<HeistnpcblueprinttypesItem> {}
    
    export interface HeistnpcdialogueItem {
      DialogueEventKey?: HeistnpcdialogueItem_DialogueEventKey;
      HeistNPCsKey?: HeistnpcdialogueItem_HeistNPCsKey;
      AudioNormal?: HeistnpcdialogueItem_AudioNormal;
      AudioLoud?: any[];
      Unk004?: number;
    }
    export interface HeistnpcdialogueItem_DialogueEventKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcdialogueItem_HeistNPCsKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface HeistnpcdialogueItem_AudioNormalItem {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcdialogueItem_AudioNormal extends Array<HeistnpcdialogueItem_AudioNormalItem> {}
    /** Source: data\heistnpcdialogue.json */
    export interface Heistnpcdialogue extends Array<HeistnpcdialogueItem> {}
    
    export interface HeistnpcsItem {
      NPCsKey?: HeistnpcsItem_NPCsKey;
      MonsterVarietiesKey?: HeistnpcsItem_MonsterVarietiesKey;
      SkillLevel_HeistJobsKeys?: HeistnpcsItem_SkillLevel_HeistJobsKeys;
      PortraitFile?: string;
      HeistNPCStatsKeys?: HeistnpcsItem_HeistNPCStatsKeys;
      StatValues?: number[];
      Unk006?: number;
      SkillLevel_Values?: number[];
      Name?: string;
      SilhouetteFile?: string;
      Unk010?: number;
      Unk011?: number;
      HeistNPCsKey?: any;
      StatValues2?: number[];
      Ally_NPCsKey?: HeistnpcsItem_Ally_NPCsKey;
      ActiveNPCIcon?: string;
      HeistJobsKey?: HeistnpcsItem_HeistJobsKey;
      Equip_AchievementItemsKeys?: HeistnpcsItem_Equip_AchievementItemsKeys;
      AOFile?: string;
      Unk019?: HeistnpcsItem_Unk019;
    }
    export interface HeistnpcsItem_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_SkillLevel_HeistJobsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_SkillLevel_HeistJobsKeys extends Array<HeistnpcsItem_SkillLevel_HeistJobsKeysItem> {}
    export interface HeistnpcsItem_HeistNPCStatsKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface HeistnpcsItem_HeistNPCStatsKeys extends Array<HeistnpcsItem_HeistNPCStatsKeysItem> {}
    export interface HeistnpcsItem_Ally_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_HeistJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_Equip_AchievementItemsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface HeistnpcsItem_Equip_AchievementItemsKeys extends Array<HeistnpcsItem_Equip_AchievementItemsKeysItem> {}
    export interface HeistnpcsItem_Unk019 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\heistnpcs.json */
    export interface Heistnpcs extends Array<HeistnpcsItem> {}
    
    export interface HeistnpcstatsItem {
      StatsKey?: HeistnpcstatsItem_StatsKey;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
    }
    export interface HeistnpcstatsItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistnpcstats.json */
    export interface Heistnpcstats extends Array<HeistnpcstatsItem> {}
    
    export interface HeistobjectivesItem {
      BaseItemType?: HeistobjectivesItem_BaseItemType;
      Scaling?: number;
      Name?: string;
    }
    export interface HeistobjectivesItem_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\heistobjectives.json */
    export interface Heistobjectives extends Array<HeistobjectivesItem> {}
    
    export interface HeistobjectivevaluedescriptionsItem {
      Tier?: number;
      MarkersMultiply?: number;
      Description?: string;
    }
    /** Source: data\heistobjectivevaluedescriptions.json */
    export interface Heistobjectivevaluedescriptions extends Array<HeistobjectivevaluedescriptionsItem> {}
    
    /** Source: data\heistpatrolpacks.json */
    export type Heistpatrolpacks = any[];
    
    /** Source: data\heistquestcontracts.json */
    export type Heistquestcontracts = any[];
    
    export interface HeistrevealingnpcsItem {
      NPCsKey?: HeistrevealingnpcsItem_NPCsKey;
      PortraitFile?: string;
      NPCAudioKey?: HeistrevealingnpcsItem_NPCAudioKey;
      Unk003?: number;
    }
    export interface HeistrevealingnpcsItem_NPCsKey {
      TableName?: string;
      Id?: string;
    }
    export interface HeistrevealingnpcsItem_NPCAudioKeyItem {
      TableName?: string;
      Id?: string;
    }
    export interface HeistrevealingnpcsItem_NPCAudioKey extends Array<HeistrevealingnpcsItem_NPCAudioKeyItem> {}
    /** Source: data\heistrevealingnpcs.json */
    export interface Heistrevealingnpcs extends Array<HeistrevealingnpcsItem> {}
    
    /** Source: data\heistrooms.json */
    export type Heistrooms = any[];
    
    /** Source: data\heiststoragelayout.json */
    export type Heiststoragelayout = any[];
    
    export interface HeistvaluescalingItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
    }
    /** Source: data\heistvaluescaling.json */
    export interface Heistvaluescaling extends Array<HeistvaluescalingItem> {}
    
    export interface HellscapeaoreplacementsItem {
      Original?: string;
      HASH32?: number;
      Replacement?: string;
    }
    /** Source: data\hellscapeaoreplacements.json */
    export interface Hellscapeaoreplacements extends Array<HellscapeaoreplacementsItem> {}
    
    /** Source: data\hellscapeareapacks.json */
    export type Hellscapeareapacks = any[];
    
    export interface HellscapeexperiencelevelsItem {
      Level?: number;
      Experience?: number;
    }
    /** Source: data\hellscapeexperiencelevels.json */
    export interface Hellscapeexperiencelevels extends Array<HellscapeexperiencelevelsItem> {}
    
    /** Source: data\hellscapefactions.json */
    export type Hellscapefactions = any[];
    
    export interface HellscapeimmunemonstersItem {
      Monster?: HellscapeimmunemonstersItem_Monster;
    }
    export interface HellscapeimmunemonstersItem_Monster {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\hellscapeimmunemonsters.json */
    export interface Hellscapeimmunemonsters extends Array<HellscapeimmunemonstersItem> {}
    
    export interface HellscapeitemmodificationtiersItem {
      Tier?: number;
      IsMap?: boolean;
      Unk002?: number;
      MinItemLvl?: number;
    }
    /** Source: data\hellscapeitemmodificationtiers.json */
    export interface Hellscapeitemmodificationtiers extends Array<HellscapeitemmodificationtiersItem> {}
    
    export interface HellscapelifescalingperlevelItem {
      AreaLevel?: number;
      Scale?: number;
    }
    /** Source: data\hellscapelifescalingperlevel.json */
    export interface Hellscapelifescalingperlevel extends Array<HellscapelifescalingperlevelItem> {}
    
    export interface HellscapemodificationinventorylayoutItem {
      Id?: string;
      Column?: number;
      Row?: number;
      IsMapSlot?: boolean;
      Unk004?: number;
      Width?: number;
      Height?: number;
      Stat?: any;
      StatValue?: number;
      UnlockedWith?: any;
      Quest?: any;
    }
    /** Source: data\hellscapemodificationinventorylayout.json */
    export interface Hellscapemodificationinventorylayout extends Array<HellscapemodificationinventorylayoutItem> {}
    
    /** Source: data\hellscapemods.json */
    export type Hellscapemods = any[];
    
    /** Source: data\hellscapemonsterpacks.json */
    export type Hellscapemonsterpacks = any[];
    
    export interface HellscapepassivesItem {
      Id?: string;
      Name?: string;
      Stats?: HellscapepassivesItem_Stats;
      StatsValues?: number[];
      Points?: number;
      HASH16?: number;
      Icon?: string;
      IconMaxed?: string;
      SoundEffect?: any;
      Unk009?: number;
      Quest?: any;
    }
    export interface HellscapepassivesItem_StatsItem {
      TableName?: string;
      Id?: string;
    }
    export interface HellscapepassivesItem_Stats extends Array<HellscapepassivesItem_StatsItem> {}
    /** Source: data\hellscapepassives.json */
    export interface Hellscapepassives extends Array<HellscapepassivesItem> {}
    
    export interface HellscapepassivetreeItem {
      Id?: string;
      AllocationsRequired?: number;
      Passives?: HellscapepassivetreeItem_Passives;
    }
    export interface HellscapepassivetreeItem_PassivesItem {
      TableName?: string;
      Id?: string;
    }
    export interface HellscapepassivetreeItem_Passives extends Array<HellscapepassivetreeItem_PassivesItem> {}
    /** Source: data\hellscapepassivetree.json */
    export interface Hellscapepassivetree extends Array<HellscapepassivetreeItem> {}
    
    export interface HideoutcraftingbenchdoodadsItem {
      Unk000?: HideoutcraftingbenchdoodadsItem_Unk000;
      Unk001?: HideoutcraftingbenchdoodadsItem_Unk001;
    }
    export interface HideoutcraftingbenchdoodadsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface HideoutcraftingbenchdoodadsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\hideoutcraftingbenchdoodads.json */
    export interface Hideoutcraftingbenchdoodads extends Array<HideoutcraftingbenchdoodadsItem> {}
    
    export interface HideoutcraftingbenchinterfacevisualsItem {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
    }
    /** Source: data\hideoutcraftingbenchinterfacevisuals.json */
    export interface Hideoutcraftingbenchinterfacevisuals extends Array<HideoutcraftingbenchinterfacevisualsItem> {}
    
    export interface HideoutdoodadcategoryItem {
      Id?: string;
      Name?: string;
    }
    /** Source: data\hideoutdoodadcategory.json */
    export interface Hideoutdoodadcategory extends Array<HideoutdoodadcategoryItem> {}
    
    export interface HideoutdoodadsItem {
      BaseItemTypesKey?: HideoutdoodadsItem_BaseItemTypesKey;
      Variation_AOFiles?: string[];
      IsNonMasterDoodad?: boolean;
      InheritsFrom?: string;
      Unk004?: boolean;
      IsCraftingBench?: boolean;
      Tags?: HideoutdoodadsItem_Tags;
      Unk007?: boolean;
      Unk008?: any;
      Category?: HideoutdoodadsItem_Category;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: any;
      Unk013?: boolean;
      Unk014?: any;
      Unk015?: any[];
      Unk016?: number;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: boolean;
    }
    export interface HideoutdoodadsItem_BaseItemTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface HideoutdoodadsItem_TagsItem {
      TableName?: string;
      Id?: string;
    }
    export interface HideoutdoodadsItem_Tags extends Array<HideoutdoodadsItem_TagsItem> {}
    export interface HideoutdoodadsItem_Category {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\hideoutdoodads.json */
    export interface Hideoutdoodads extends Array<HideoutdoodadsItem> {}
    
    export interface HideoutdoodadtagsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: number[];
      Name?: string;
    }
    /** Source: data\hideoutdoodadtags.json */
    export interface Hideoutdoodadtags extends Array<HideoutdoodadtagsItem> {}
    
    /** Source: data\hideoutnpcs.json */
    export type Hideoutnpcs = any[];
    
    export interface HideoutrarityItem {
      Id?: string;
      Text?: string;
    }
    /** Source: data\hideoutrarity.json */
    export interface Hideoutrarity extends Array<HideoutrarityItem> {}
    
    /** Source: data\hideoutresistpenalties.json */
    export type Hideoutresistpenalties = any[];
    
    /** Source: data\hideouts.json */
    export type Hideouts = any[];
    
    export interface HideoutstashdoodadsItem {
      Unk000?: HideoutstashdoodadsItem_Unk000;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    export interface HideoutstashdoodadsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\hideoutstashdoodads.json */
    export interface Hideoutstashdoodads extends Array<HideoutstashdoodadsItem> {}
    
    export interface HideoutwaypointdoodadsItem {
      Unk000?: HideoutwaypointdoodadsItem_Unk000;
      Unk001?: number[];
    }
    export interface HideoutwaypointdoodadsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\hideoutwaypointdoodads.json */
    export interface Hideoutwaypointdoodads extends Array<HideoutwaypointdoodadsItem> {}
    
    export interface HudenergyshieldvisualsItem {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: string;
      Unk008?: string;
      Unk009?: boolean;
    }
    /** Source: data\hudenergyshieldvisuals.json */
    export interface Hudenergyshieldvisuals extends Array<HudenergyshieldvisualsItem> {}
    
    export interface HudlifevisualsItem {
      Id?: string;
      Unk001?: string;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: string;
      Unk006?: string;
      Unk007?: string;
      Unk008?: string;
      Unk009?: string;
      Unk010?: string;
      Unk011?: string;
      Unk012?: number;
      Unk013?: string;
    }
    /** Source: data\hudlifevisuals.json */
    export interface Hudlifevisuals extends Array<HudlifevisualsItem> {}
    
    /** Source: data\hudvisualsfromstat.json */
    export type Hudvisualsfromstat = any[];
    
    export interface ImpactsounddataItem {
      Id?: string;
      Sound?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    /** Source: data\impactsounddata.json */
    export interface Impactsounddata extends Array<ImpactsounddataItem> {}
    
    export interface IncubatorsItem {
      BaseItemTypesKey?: IncubatorsItem_BaseItemTypesKey;
      Unk001?: number;
      Description?: string;
      HASH16?: number;
      AchievementItemsKeys?: any[];
    }
    export interface IncubatorsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\incubators.json */
    export interface Incubators extends Array<IncubatorsItem> {}
    
    export interface IncursionarchitectItem {
      MonsterVarietiesKey?: IncursionarchitectItem_MonsterVarietiesKey;
      MinLevel?: number;
    }
    export interface IncursionarchitectItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\incursionarchitect.json */
    export interface Incursionarchitect extends Array<IncursionarchitectItem> {}
    
    /** Source: data\incursionbrackets.json */
    export type Incursionbrackets = any[];
    
    /** Source: data\incursionchestrewards.json */
    export type Incursionchestrewards = any[];
    
    /** Source: data\incursionchests.json */
    export type Incursionchests = any[];
    
    /** Source: data\incursionroombossfightevents.json */
    export type Incursionroombossfightevents = any[];
    
    /** Source: data\incursionrooms.json */
    export type Incursionrooms = any[];
    
    export interface IncursionuniqueupgradecomponentsItem {
      BaseUnique?: IncursionuniqueupgradecomponentsItem_BaseUnique;
      UpgradeCurrency?: IncursionuniqueupgradecomponentsItem_UpgradeCurrency;
    }
    export interface IncursionuniqueupgradecomponentsItem_BaseUnique {
      TableName?: string;
      Text?: string;
    }
    export interface IncursionuniqueupgradecomponentsItem_UpgradeCurrency {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\incursionuniqueupgradecomponents.json */
    export interface Incursionuniqueupgradecomponents extends Array<IncursionuniqueupgradecomponentsItem> {}
    
    /** Source: data\indexablesupportgems.json */
    export type Indexablesupportgems = any[];
    
    /** Source: data\indicatorconditions.json */
    export type Indicatorconditions = any[];
    
    export interface InfluenceexaltsItem {
      Influence?: number;
      BaseItemTypesKey?: any;
    }
    /** Source: data\influenceexalts.json */
    export interface Influenceexalts extends Array<InfluenceexaltsItem> {}
    
    /** Source: data\influencemodupgrades.json */
    export type Influencemodupgrades = any[];
    
    export interface InfluencetagsItem {
      ItemClass?: InfluencetagsItem_ItemClass;
      Influence?: number;
      Tag?: InfluencetagsItem_Tag;
    }
    export interface InfluencetagsItem_ItemClass {
      TableName?: string;
      Id?: string;
    }
    export interface InfluencetagsItem_Tag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\influencetags.json */
    export interface Influencetags extends Array<InfluencetagsItem> {}
    
    export interface InvasionmonsterrestrictionsItem {
      Id?: string;
      WorldAreasKey?: InvasionmonsterrestrictionsItem_WorldAreasKey;
      MonsterVarietiesKeys?: InvasionmonsterrestrictionsItem_MonsterVarietiesKeys;
      Unk003?: number[];
    }
    export interface InvasionmonsterrestrictionsItem_WorldAreasKey {
      TableName?: string;
      Id?: string;
    }
    export interface InvasionmonsterrestrictionsItem_MonsterVarietiesKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface InvasionmonsterrestrictionsItem_MonsterVarietiesKeys extends Array<InvasionmonsterrestrictionsItem_MonsterVarietiesKeysItem> {}
    /** Source: data\invasionmonsterrestrictions.json */
    export interface Invasionmonsterrestrictions extends Array<InvasionmonsterrestrictionsItem> {}
    
    /** Source: data\invasionmonstersperarea.json */
    export type Invasionmonstersperarea = any[];
    
    export interface InventoriesItem {
      Id?: string;
      InventoryIdKey?: number;
      InventoryTypeKey?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: number;
    }
    /** Source: data\inventories.json */
    export interface Inventories extends Array<InventoriesItem> {}
    
    export interface ItemclasscategoriesItem {
      Id?: string;
      Text?: string;
      Unk002?: any;
    }
    /** Source: data\itemclasscategories.json */
    export interface Itemclasscategories extends Array<ItemclasscategoriesItem> {}
    
    export interface ItemclassesItem {
      Id?: string;
      Name?: string;
      TradeMarketCategory?: ItemclassesItem_TradeMarketCategory;
      ItemClassCategory?: ItemclassesItem_ItemClassCategory;
      RemovedIfLeavesArea?: boolean;
      Unk005?: any[];
      IdentifyAchievements?: any[];
      AllocateToMapOwner?: boolean;
      AlwaysAllocate?: boolean;
      CanHaveVeiledMods?: boolean;
      PickedUpQuest?: any;
      Unk011?: number;
      AlwaysShow?: boolean;
      CanBeCorrupted?: boolean;
      CanHaveIncubators?: boolean;
      CanHaveInfluence?: boolean;
      CanBeDoubleCorrupted?: boolean;
      CanHaveAspects?: boolean;
      CanTransferSkin?: boolean;
      ItemStance?: any;
      CanScourge?: boolean;
      CanUpgradeRarity?: boolean;
      Unk022?: boolean;
      Unk023?: boolean;
      MaxInventoryDimensions?: any[];
      Flags?: any[];
      Unmodifiable?: boolean;
      CanBeFractured?: boolean;
      EquipAchievements?: any;
    }
    export interface ItemclassesItem_TradeMarketCategory {
      TableName?: string;
      Id?: string;
    }
    export interface ItemclassesItem_ItemClassCategory {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\itemclasses.json */
    export interface Itemclasses extends Array<ItemclassesItem> {}
    
    /** Source: data\itemdisenchantvalues.json */
    export type Itemdisenchantvalues = any[];
    
    export interface ItemexperienceperlevelItem {
      ItemExperienceType?: ItemexperienceperlevelItem_ItemExperienceType;
      ItemCurrentLevel?: number;
      Experience?: number;
    }
    export interface ItemexperienceperlevelItem_ItemExperienceType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\itemexperienceperlevel.json */
    export interface Itemexperienceperlevel extends Array<ItemexperienceperlevelItem> {}
    
    export interface ItemexperiencetypesItem {
      Id?: string;
    }
    /** Source: data\itemexperiencetypes.json */
    export interface Itemexperiencetypes extends Array<ItemexperiencetypesItem> {}
    
    /** Source: data\itemframetype.json */
    export type Itemframetype = any[];
    
    /** Source: data\iteminherentskills.json */
    export type Iteminherentskills = any[];
    
    export interface ItemisedvisualeffectItem {
      EffectBaseType?: ItemisedvisualeffectItem_EffectBaseType;
      VisualEffect?: ItemisedvisualeffectItem_VisualEffect;
      VisualIdentity?: any;
      Stats?: any[];
      ItemClasses?: ItemisedvisualeffectItem_ItemClasses;
      Unk005?: any[];
      Unk006?: boolean;
      Unk007?: any[];
      Unk008?: number[];
      Unk009?: boolean;
      Unk010?: any[];
      Unk011?: boolean;
      Unk012?: any[];
      Unk013?: any[];
      Unk014?: any[];
      Unk015?: any[];
      Unk016?: any;
      Unk017?: boolean;
      Unk018?: any;
    }
    export interface ItemisedvisualeffectItem_EffectBaseType {
      TableName?: string;
      Id?: string;
    }
    export interface ItemisedvisualeffectItem_VisualEffect {
      TableName?: string;
      Id?: string;
    }
    export interface ItemisedvisualeffectItem_ItemClassesItem {
      TableName?: string;
      Id?: string;
    }
    export interface ItemisedvisualeffectItem_ItemClasses extends Array<ItemisedvisualeffectItem_ItemClassesItem> {}
    /** Source: data\itemisedvisualeffect.json */
    export interface Itemisedvisualeffect extends Array<ItemisedvisualeffectItem> {}
    
    /** Source: data\itemisedvisualeffectexclusivetypes.json */
    export type Itemisedvisualeffectexclusivetypes = any[];
    
    export interface ItemnotecodeItem {
      BaseItem?: ItemnotecodeItem_BaseItem;
      Code?: string;
      Order1?: number;
      Show?: boolean;
      Order2?: number;
    }
    export interface ItemnotecodeItem_BaseItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\itemnotecode.json */
    export interface Itemnotecode extends Array<ItemnotecodeItem> {}
    
    /** Source: data\itemspirit.json */
    export type Itemspirit = any[];
    
    export interface ItemstancesItem {
      Id?: string;
    }
    /** Source: data\itemstances.json */
    export interface Itemstances extends Array<ItemstancesItem> {}
    
    /** Source: data\itemtoggleable.json */
    export type Itemtoggleable = any[];
    
    export interface ItemvisualeffectItem {
      Id?: string;
      DaggerEPKFile?: string;
      BowEPKFile?: string;
      OneHandedMaceEPKFile?: string;
      OneHandedSwordEPKFile?: string;
      Unk005?: string;
      TwoHandedSwordEPKFile?: string;
      TwoHandedStaffEPKFile?: string;
      HASH16?: number;
      TwoHandedMaceEPKFile?: any;
      OneHandedAxeEPKFile?: any;
      TwoHandedAxeEPKFile?: any;
      ClawEPKFile?: any;
      PETFile?: any;
      Shield?: any[];
      Unk015?: boolean;
    }
    /** Source: data\itemvisualeffect.json */
    export interface Itemvisualeffect extends Array<ItemvisualeffectItem> {}
    
    export interface ItemvisualheldbodymodelItem {
      ItemVisualIdentity?: ItemvisualheldbodymodelItem_ItemVisualIdentity;
      MarauderAnimatedObject?: string;
      RangerAnimatedObject?: string;
      WitchAnimatedObject?: string;
      DuelistAnimatedObject?: string;
      TemplarAnimatedObject?: string;
      ShadowAnimatedObject?: string;
      ScionAnimatedObject?: string;
      MarauderBone?: string;
      RangerBone?: string;
      WitchBone?: string;
      DuelistBone?: string;
      TemplarBone?: string;
      ShadowBone?: string;
      ScionBone?: string;
    }
    export interface ItemvisualheldbodymodelItem_ItemVisualIdentity {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\itemvisualheldbodymodel.json */
    export interface Itemvisualheldbodymodel extends Array<ItemvisualheldbodymodelItem> {}
    
    /** Source: data\itemvisualheldbodymodeloverridebyitemaffiliatedattributes.json */
    export type Itemvisualheldbodymodeloverridebyitemaffiliatedattributes = any[];
    
    export interface ItemvisualidentityItem {
      Id?: string;
      DDSFile?: string;
      AOFile?: string;
      InventorySoundEffect?: ItemvisualidentityItem_InventorySoundEffect;
      HASH16?: number;
      AOFile2?: string;
    }
    export interface ItemvisualidentityItem_InventorySoundEffect {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\itemvisualidentity.json */
    export interface Itemvisualidentity extends Array<ItemvisualidentityItem> {}
    
    export interface ItemvisualreplacementItem {
      BaseItemType?: ItemvisualreplacementItem_BaseItemType;
      Unk001?: ItemvisualreplacementItem_Unk001;
      Unk002?: ItemvisualreplacementItem_Unk002;
    }
    export interface ItemvisualreplacementItem_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    export interface ItemvisualreplacementItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ItemvisualreplacementItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\itemvisualreplacement.json */
    export interface Itemvisualreplacement extends Array<ItemvisualreplacementItem> {}
    
    export interface JobassassinationspawnergroupsItem {
      Unk000?: JobassassinationspawnergroupsItem_Unk000;
      Unk001?: JobassassinationspawnergroupsItem_Unk001;
    }
    export interface JobassassinationspawnergroupsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface JobassassinationspawnergroupsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\jobassassinationspawnergroups.json */
    export interface Jobassassinationspawnergroups extends Array<JobassassinationspawnergroupsItem> {}
    
    /** Source: data\jobraidbrackets.json */
    export type Jobraidbrackets = any[];
    
    /** Source: data\keywordpopups.json */
    export type Keywordpopups = any[];
    
    export interface KillstreakthresholdsItem {
      Kills?: number;
      MonsterVarietiesKey?: any;
      AchievementItemsKey?: KillstreakthresholdsItem_AchievementItemsKey;
    }
    export interface KillstreakthresholdsItem_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\killstreakthresholds.json */
    export interface Killstreakthresholds extends Array<KillstreakthresholdsItem> {}
    
    /** Source: data\kioskmodecharactertutorials.json */
    export type Kioskmodecharactertutorials = any[];
    
    export interface KiraclevelsItem {
      AreaLevel?: number;
      Unk001?: number;
    }
    /** Source: data\kiraclevels.json */
    export interface Kiraclevels extends Array<KiraclevelsItem> {}
    
    export interface LakebosslifescalingperlevelItem {
      Level?: number;
      Scaling?: number;
    }
    /** Source: data\lakebosslifescalingperlevel.json */
    export interface Lakebosslifescalingperlevel extends Array<LakebosslifescalingperlevelItem> {}
    
    export interface LeagueflagItem {
      Id?: string;
      Image?: string;
      IsHC?: boolean;
      IsSSF?: boolean;
      Banner?: string;
      IsRuthless?: boolean;
    }
    /** Source: data\leagueflag.json */
    export interface Leagueflag extends Array<LeagueflagItem> {}
    
    /** Source: data\leagueinfo.json */
    export type Leagueinfo = any[];
    
    export interface LeagueinfopanelversionsItem {
      Id?: string;
    }
    /** Source: data\leagueinfopanelversions.json */
    export interface Leagueinfopanelversions extends Array<LeagueinfopanelversionsItem> {}
    
    export interface LeagueprogressquestflagsItem {
      QuestFlag?: LeagueprogressquestflagsItem_QuestFlag;
      CompletionString?: LeagueprogressquestflagsItem_CompletionString;
      Boss?: string;
      Unk003?: boolean;
    }
    export interface LeagueprogressquestflagsItem_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface LeagueprogressquestflagsItem_CompletionString {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\leagueprogressquestflags.json */
    export interface Leagueprogressquestflags extends Array<LeagueprogressquestflagsItem> {}
    
    /** Source: data\leaguestaticrewards.json */
    export type Leaguestaticrewards = any[];
    
    export interface LegacyatlasinfluenceoutcomesItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number[];
    }
    /** Source: data\legacyatlasinfluenceoutcomes.json */
    export interface Legacyatlasinfluenceoutcomes extends Array<LegacyatlasinfluenceoutcomesItem> {}
    
    /** Source: data\legionbalanceperlevel.json */
    export type Legionbalanceperlevel = any[];
    
    export interface LegionchestcountsItem {
      LegionFactionsKey?: LegionchestcountsItem_LegionFactionsKey;
      LegionRanksKey?: LegionchestcountsItem_LegionRanksKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      MinLevel?: number;
      Unk007?: number;
    }
    export interface LegionchestcountsItem_LegionFactionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface LegionchestcountsItem_LegionRanksKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\legionchestcounts.json */
    export interface Legionchestcounts extends Array<LegionchestcountsItem> {}
    
    /** Source: data\legionchesttypes.json */
    export type Legionchesttypes = any[];
    
    export interface LegionfactionsItem {
      Id?: string;
      SpawnWeight?: number;
      LegionBalancePerLevelKey?: LegionfactionsItem_LegionBalancePerLevelKey;
      Unk003?: number;
      Unk004?: number;
      BuffVisualsKey?: LegionfactionsItem_BuffVisualsKey;
      MiscAnimatedKey1?: LegionfactionsItem_MiscAnimatedKey1;
      MiscAnimatedKey2?: LegionfactionsItem_MiscAnimatedKey2;
      MiscAnimatedKey3?: LegionfactionsItem_MiscAnimatedKey3;
      AchievementItemsKeys1?: any[];
      MiscAnimatedKey4?: LegionfactionsItem_MiscAnimatedKey4;
      MiscAnimatedKey5?: LegionfactionsItem_MiscAnimatedKey5;
      Unk012?: number;
      Unk013?: number;
      AchievementItemsKeys2?: any[];
      StatsKey?: LegionfactionsItem_StatsKey;
      Shard?: string;
      RewardJewelArt?: string;
    }
    export interface LegionfactionsItem_LegionBalancePerLevelKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface LegionfactionsItem_BuffVisualsKey {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_MiscAnimatedKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_MiscAnimatedKey3 {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_MiscAnimatedKey4 {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_MiscAnimatedKey5 {
      TableName?: string;
      Id?: string;
    }
    export interface LegionfactionsItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\legionfactions.json */
    export interface Legionfactions extends Array<LegionfactionsItem> {}
    
    export interface LegionmonstercountsItem {
      LegionFactionsKey?: LegionmonstercountsItem_LegionFactionsKey;
      LegionRanksKey?: LegionmonstercountsItem_LegionRanksKey;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    export interface LegionmonstercountsItem_LegionFactionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface LegionmonstercountsItem_LegionRanksKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\legionmonstercounts.json */
    export interface Legionmonstercounts extends Array<LegionmonstercountsItem> {}
    
    /** Source: data\legionmonstervarieties.json */
    export type Legionmonstervarieties = any[];
    
    /** Source: data\legionranks.json */
    export type Legionranks = any[];
    
    export interface LegionrewardtypevisualsItem {
      IntId?: number;
      MinimapIconsKey?: LegionrewardtypevisualsItem_MinimapIconsKey;
      Unk002?: string;
      MiscAnimatedKey?: LegionrewardtypevisualsItem_MiscAnimatedKey;
      Unk004?: number;
      Id?: string;
    }
    export interface LegionrewardtypevisualsItem_MinimapIconsKey {
      TableName?: string;
      Id?: string;
    }
    export interface LegionrewardtypevisualsItem_MiscAnimatedKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\legionrewardtypevisuals.json */
    export interface Legionrewardtypevisuals extends Array<LegionrewardtypevisualsItem> {}
    
    export interface LevelrelativeplayerscalingItem {
      PlayerLevel?: number;
      MonsterLevel?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
    }
    /** Source: data\levelrelativeplayerscaling.json */
    export interface Levelrelativeplayerscaling extends Array<LevelrelativeplayerscalingItem> {}
    
    /** Source: data\loginareas.json */
    export type Loginareas = any[];
    
    export interface MapcompletionachievementsItem {
      Id?: string;
      MapStatConditionsKeys?: any[];
      StatsKeys?: MapcompletionachievementsItem_StatsKeys;
      AchievementItemsKeys?: any[];
      MapTierAchievementsKeys?: any[];
      Unk005?: boolean;
      WorldAreasKeys?: MapcompletionachievementsItem_WorldAreasKeys;
      Unk007?: any[];
    }
    export interface MapcompletionachievementsItem_StatsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface MapcompletionachievementsItem_StatsKeys extends Array<MapcompletionachievementsItem_StatsKeysItem> {}
    export interface MapcompletionachievementsItem_WorldAreasKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface MapcompletionachievementsItem_WorldAreasKeys extends Array<MapcompletionachievementsItem_WorldAreasKeysItem> {}
    /** Source: data\mapcompletionachievements.json */
    export interface Mapcompletionachievements extends Array<MapcompletionachievementsItem> {}
    
    /** Source: data\mapconnections.json */
    export type Mapconnections = any[];
    
    /** Source: data\mapcreationinformation.json */
    export type Mapcreationinformation = any[];
    
    /** Source: data\mapcurrencyinventorylayout.json */
    export type Mapcurrencyinventorylayout = any[];
    
    /** Source: data\mapdevicerecipes.json */
    export type Mapdevicerecipes = any[];
    
    export interface MapdevicesItem {
      Id?: string;
      MiscObject?: any;
      Unk002?: number;
      Unk003?: string;
      Unk004?: string;
      Unk005?: any[];
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: boolean;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
    }
    /** Source: data\mapdevices.json */
    export interface Mapdevices extends Array<MapdevicesItem> {}
    
    /** Source: data\mapfragmentmods.json */
    export type Mapfragmentmods = any[];
    
    /** Source: data\mapinhabitants.json */
    export type Mapinhabitants = any[];
    
    export interface MappinsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Name?: string;
      Description?: string;
      Unk008?: number;
      Unk009?: any[];
      Unk010?: number;
      Unk011?: any[];
      Unk012?: number;
      Unk013?: number;
      Unk014?: any;
      Unk015?: any;
      Unk016?: string;
    }
    /** Source: data\mappins.json */
    export interface Mappins extends Array<MappinsItem> {}
    
    export interface MapsItem {
      MapKeyTier?: MapsItem_MapKeyTier;
      SomeRef02?: any;
      UnkLong01?: number;
      UnkLong02?: number;
      SomeRef03?: any;
      UnkLong03?: number;
      UnkLong04?: number;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: boolean;
    }
    export interface MapsItem_MapKeyTier {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\maps.json */
    export interface Maps extends Array<MapsItem> {}
    
    /** Source: data\mapseries.json */
    export type Mapseries = any[];
    
    /** Source: data\mapseriestiers.json */
    export type Mapseriestiers = any[];
    
    /** Source: data\mapstashspecialtypeentries.json */
    export type Mapstashspecialtypeentries = any[];
    
    /** Source: data\mapstashuniquemapinfo.json */
    export type Mapstashuniquemapinfo = any[];
    
    export interface MapstatconditionsItem {
      Id?: string;
      StatsKey?: MapstatconditionsItem_StatsKey;
      Unk002?: boolean;
      StatMin?: number;
      StatMax?: number;
      Unk005?: boolean;
    }
    export interface MapstatconditionsItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\mapstatconditions.json */
    export interface Mapstatconditions extends Array<MapstatconditionsItem> {}
    
    export interface MaptierachievementsItem {
      Id?: string;
      AchievementItemsKey?: MaptierachievementsItem_AchievementItemsKey;
      MapTiers?: number[];
    }
    export interface MaptierachievementsItem_AchievementItemsKeyItem {
      TableName?: string;
      Id?: string;
    }
    export interface MaptierachievementsItem_AchievementItemsKey extends Array<MaptierachievementsItem_AchievementItemsKeyItem> {}
    /** Source: data\maptierachievements.json */
    export interface Maptierachievements extends Array<MaptierachievementsItem> {}
    
    export interface MaptiersItem {
      Tier?: number;
      Level?: number;
      Level2?: number;
    }
    /** Source: data\maptiers.json */
    export interface Maptiers extends Array<MaptiersItem> {}
    
    export interface MavendialogItem {
      Id?: string;
      TextAudioT1?: MavendialogItem_TextAudioT1;
      TextAudioT2?: MavendialogItem_TextAudioT2;
      TextAudioT3?: MavendialogItem_TextAudioT3;
      TextAudioT4?: MavendialogItem_TextAudioT4;
      TextAudioT5?: MavendialogItem_TextAudioT5;
      Unk006?: boolean;
      TextAudioT6?: any;
    }
    export interface MavendialogItem_TextAudioT1 {
      TableName?: string;
      Id?: string;
    }
    export interface MavendialogItem_TextAudioT2 {
      TableName?: string;
      Id?: string;
    }
    export interface MavendialogItem_TextAudioT3 {
      TableName?: string;
      Id?: string;
    }
    export interface MavendialogItem_TextAudioT4 {
      TableName?: string;
      Id?: string;
    }
    export interface MavendialogItem_TextAudioT5 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\mavendialog.json */
    export interface Mavendialog extends Array<MavendialogItem> {}
    
    /** Source: data\mavenfights.json */
    export type Mavenfights = any[];
    
    export interface MavenjewelradiuskeystonesItem {
      Keystone?: MavenjewelradiuskeystonesItem_Keystone;
    }
    export interface MavenjewelradiuskeystonesItem_Keystone {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\mavenjewelradiuskeystones.json */
    export interface Mavenjewelradiuskeystones extends Array<MavenjewelradiuskeystonesItem> {}
    
    export interface MeleeItem {
      ActiveSkill?: MeleeItem_ActiveSkill;
      Unk001?: number;
      MiscAnimated?: any;
      MeleeTrailsKey1?: any;
      MeleeTrailsKey2?: any;
      MeleeTrailsKey3?: any;
      MeleeTrailsKey4?: any;
      MeleeTrailsKey5?: any;
      MeleeTrailsKey6?: any;
      MeleeTrailsKey7?: any;
      Unk010?: boolean;
      SurgeEffect_EPKFile?: string;
      Unk012?: string;
      Unk013?: string;
    }
    export interface MeleeItem_ActiveSkill {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\melee.json */
    export interface Melee extends Array<MeleeItem> {}
    
    export interface MeleetrailsItem {
      EPKFile1?: string;
      Unk001?: number;
      EPKFile2?: string;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: boolean;
      AOFile?: string;
      Unk008?: boolean;
      Unk009?: string;
    }
    /** Source: data\meleetrails.json */
    export interface Meleetrails extends Array<MeleetrailsItem> {}
    
    export interface MemorylinetypeItem {
      Id?: string;
      Unk001?: MemorylinetypeItem_Unk001;
      Unk002?: number;
      Unk003?: number[];
      Unk004?: number[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: MemorylinetypeItem_Unk007;
      Unk008?: number;
      Suffix?: string;
      Unk010?: MemorylinetypeItem_Unk010;
    }
    export interface MemorylinetypeItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MemorylinetypeItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MemorylinetypeItem_Unk010 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\memorylinetype.json */
    export interface Memorylinetype extends Array<MemorylinetypeItem> {}
    
    export interface MetamorphosisstashtablayoutItem {
      Id?: string;
      StoredItem?: MetamorphosisstashtablayoutItem_StoredItem;
      XOffset?: number;
      YOffset?: number;
      FirstSlotIndex?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
    }
    export interface MetamorphosisstashtablayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\metamorphosisstashtablayout.json */
    export interface Metamorphosisstashtablayout extends Array<MetamorphosisstashtablayoutItem> {}
    
    export interface MicromigrationdataItem {
      BaseItemTypesKey?: MicromigrationdataItem_BaseItemTypesKey;
      Unk001?: number;
      Unk002?: MicromigrationdataItem_Unk002;
      Unk003?: MicromigrationdataItem_Unk003;
    }
    export interface MicromigrationdataItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface MicromigrationdataItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicromigrationdataItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\micromigrationdata.json */
    export interface Micromigrationdata extends Array<MicromigrationdataItem> {}
    
    export interface MicrotransactionappliedinventoryitemartvariationsItem {
      Unk000?: MicrotransactionappliedinventoryitemartvariationsItem_Unk000;
      DDSFiles?: string[];
      Unk002?: number[];
      Unk003?: number[];
      Unk004?: any[];
    }
    export interface MicrotransactionappliedinventoryitemartvariationsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionappliedinventoryitemartvariations.json */
    export interface Microtransactionappliedinventoryitemartvariations extends Array<MicrotransactionappliedinventoryitemartvariationsItem> {}
    
    export interface MicrotransactioncategoryItem {
      Id?: number;
      Name?: string;
    }
    /** Source: data\microtransactioncategory.json */
    export interface Microtransactioncategory extends Array<MicrotransactioncategoryItem> {}
    
    export interface MicrotransactioncharacterportraitvariationsItem {
      BaseItemType?: MicrotransactioncharacterportraitvariationsItem_BaseItemType;
    }
    export interface MicrotransactioncharacterportraitvariationsItem_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\microtransactioncharacterportraitvariations.json */
    export interface Microtransactioncharacterportraitvariations extends Array<MicrotransactioncharacterportraitvariationsItem> {}
    
    export interface MicrotransactionchargevariationsItem {
      Unk000?: MicrotransactionchargevariationsItem_Unk000;
      Unk001?: MicrotransactionchargevariationsItem_Unk001;
      Unk002?: MicrotransactionchargevariationsItem_Unk002;
      Unk003?: MicrotransactionchargevariationsItem_Unk003;
    }
    export interface MicrotransactionchargevariationsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionchargevariationsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionchargevariationsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionchargevariationsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionchargevariations.json */
    export interface Microtransactionchargevariations extends Array<MicrotransactionchargevariationsItem> {}
    
    export interface MicrotransactioncombineformulaItem {
      Id?: string;
      Result_BaseItemTypesKey?: MicrotransactioncombineformulaItem_Result_BaseItemTypesKey;
      Ingredients_BaseItemTypesKeys?: MicrotransactioncombineformulaItem_Ingredients_BaseItemTypesKeys;
      BK2File?: string;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: boolean;
    }
    export interface MicrotransactioncombineformulaItem_Result_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface MicrotransactioncombineformulaItem_Ingredients_BaseItemTypesKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface MicrotransactioncombineformulaItem_Ingredients_BaseItemTypesKeys extends Array<MicrotransactioncombineformulaItem_Ingredients_BaseItemTypesKeysItem> {}
    /** Source: data\microtransactioncombineformula.json */
    export interface Microtransactioncombineformula extends Array<MicrotransactioncombineformulaItem> {}
    
    export interface MicrotransactionconditionalapparitioneventsItem {
      Unk000?: MicrotransactionconditionalapparitioneventsItem_Unk000;
      Unk001?: number;
      Unk002?: number;
      Unk003?: MicrotransactionconditionalapparitioneventsItem_Unk003;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: any;
      Unk008?: any;
      Unk009?: number;
      Unk010?: number;
    }
    export interface MicrotransactionconditionalapparitioneventsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionconditionalapparitioneventsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionconditionalapparitionevents.json */
    export interface Microtransactionconditionalapparitionevents extends Array<MicrotransactionconditionalapparitioneventsItem> {}
    
    export interface MicrotransactionconditionalapparitionsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: number[];
      Unk003?: MicrotransactionconditionalapparitionsItem_Unk003;
      Unk004?: MicrotransactionconditionalapparitionsItem_Unk004;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
    }
    export interface MicrotransactionconditionalapparitionsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionconditionalapparitionsItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionconditionalapparitions.json */
    export interface Microtransactionconditionalapparitions extends Array<MicrotransactionconditionalapparitionsItem> {}
    
    /** Source: data\microtransactioncounters.json */
    export type Microtransactioncounters = any[];
    
    /** Source: data\microtransactioncursorvariations.json */
    export type Microtransactioncursorvariations = any[];
    
    export interface MicrotransactionequippediconvariationsItem {
      Unk000?: MicrotransactionequippediconvariationsItem_Unk000;
      DDSFiles?: string[];
      Unk002?: number[];
    }
    export interface MicrotransactionequippediconvariationsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionequippediconvariations.json */
    export interface Microtransactionequippediconvariations extends Array<MicrotransactionequippediconvariationsItem> {}
    
    export interface MicrotransactionfireworksvariationsItem {
      BaseItemTypesKey?: MicrotransactionfireworksvariationsItem_BaseItemTypesKey;
      AOFile?: string;
      Unk002?: boolean;
    }
    export interface MicrotransactionfireworksvariationsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\microtransactionfireworksvariations.json */
    export interface Microtransactionfireworksvariations extends Array<MicrotransactionfireworksvariationsItem> {}
    
    export interface MicrotransactionjewelvariationsItem {
      Unk000?: MicrotransactionjewelvariationsItem_Unk000;
      Unk001?: number;
      Unk002?: string;
      Unk003?: string;
      Unk004?: number;
      Unk005?: number[];
      Unk006?: string;
      Unk007?: string;
      Unk008?: number;
      Unk009?: number;
      Unk010?: string;
      Unk011?: number;
      Unk012?: string;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: MicrotransactionjewelvariationsItem_Unk015;
      Unk016?: boolean;
    }
    export interface MicrotransactionjewelvariationsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionjewelvariationsItem_Unk015 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionjewelvariations.json */
    export interface Microtransactionjewelvariations extends Array<MicrotransactionjewelvariationsItem> {}
    
    /** Source: data\microtransactionlevelupeffects.json */
    export type Microtransactionlevelupeffects = any[];
    
    export interface MicrotransactionobjecteffectsItem {
      Id?: string;
      Unk001?: number[];
      Script?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: MicrotransactionobjecteffectsItem_Unk005;
      Unk006?: any[];
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
    }
    export interface MicrotransactionobjecteffectsItem_Unk005 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionobjecteffects.json */
    export interface Microtransactionobjecteffects extends Array<MicrotransactionobjecteffectsItem> {}
    
    export interface MicrotransactiononkillbeamsItem {
      Id?: string;
      Unk001?: MicrotransactiononkillbeamsItem_Unk001;
      Unk002?: string;
      Unk003?: string;
      Unk004?: string;
      Unk005?: boolean;
      Unk006?: MicrotransactiononkillbeamsItem_Unk006;
    }
    export interface MicrotransactiononkillbeamsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactiononkillbeamsItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactiononkillbeams.json */
    export interface Microtransactiononkillbeams extends Array<MicrotransactiononkillbeamsItem> {}
    
    export interface MicrotransactiononkillconditionsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      Unk003?: any[];
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number[];
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: boolean;
      Unk011?: string;
      Unk012?: any[];
    }
    /** Source: data\microtransactiononkillconditions.json */
    export interface Microtransactiononkillconditions extends Array<MicrotransactiononkillconditionsItem> {}
    
    export interface MicrotransactiononkilleffectsItem {
      Id?: string;
      Unk001?: any;
      Unk002?: MicrotransactiononkilleffectsItem_Unk002;
      Unk003?: MicrotransactiononkilleffectsItem_Unk003;
      Unk004?: number;
      Unk005?: any;
      Unk006?: number;
      Unk007?: any;
    }
    export interface MicrotransactiononkilleffectsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactiononkilleffectsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactiononkilleffects.json */
    export interface Microtransactiononkilleffects extends Array<MicrotransactiononkilleffectsItem> {}
    
    /** Source: data\microtransactiononopenchesteffects.json */
    export type Microtransactiononopenchesteffects = any[];
    
    export interface MicrotransactionperiodiccharactereffectvariationsItem {
      Id?: string;
      AOFile?: string;
      MiscObject?: any;
      Unk003?: number;
    }
    /** Source: data\microtransactionperiodiccharactereffectvariations.json */
    export interface Microtransactionperiodiccharactereffectvariations extends Array<MicrotransactionperiodiccharactereffectvariationsItem> {}
    
    /** Source: data\microtransactionportalvariations.json */
    export type Microtransactionportalvariations = any[];
    
    export interface MicrotransactionraritydisplayItem {
      Rarity?: string;
      Unk001?: MicrotransactionraritydisplayItem_Unk001;
      Unk002?: string;
      Unk003?: string;
    }
    export interface MicrotransactionraritydisplayItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionraritydisplay.json */
    export interface Microtransactionraritydisplay extends Array<MicrotransactionraritydisplayItem> {}
    
    export interface MicrotransactionrecycleoutcomesItem {
      Unk000?: MicrotransactionrecycleoutcomesItem_Unk000;
      Unk001?: number;
    }
    export interface MicrotransactionrecycleoutcomesItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionrecycleoutcomes.json */
    export interface Microtransactionrecycleoutcomes extends Array<MicrotransactionrecycleoutcomesItem> {}
    
    export interface MicrotransactionrecyclesalvagevaluesItem {
      BaseItemType?: MicrotransactionrecyclesalvagevaluesItem_BaseItemType;
      Unk001?: number;
      Unk002?: number;
    }
    export interface MicrotransactionrecyclesalvagevaluesItem_BaseItemType {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\microtransactionrecyclesalvagevalues.json */
    export interface Microtransactionrecyclesalvagevalues extends Array<MicrotransactionrecyclesalvagevaluesItem> {}
    
    export interface MicrotransactionskillgemeffectslottypesItem {
      Id?: string;
      Type?: string;
      Unk002?: number;
    }
    /** Source: data\microtransactionskillgemeffectslottypes.json */
    export interface Microtransactionskillgemeffectslottypes extends Array<MicrotransactionskillgemeffectslottypesItem> {}
    
    export interface MicrotransactionslotItem {
      Id?: number;
      Unk001?: MicrotransactionslotItem_Unk001;
      Name?: string;
      Unk003?: MicrotransactionslotItem_Unk003;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
    }
    export interface MicrotransactionslotItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MicrotransactionslotItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\microtransactionslot.json */
    export interface Microtransactionslot extends Array<MicrotransactionslotItem> {}
    
    export interface MicrotransactionslotadditionaldefaultoptionsItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: string;
      Unk003?: string;
    }
    /** Source: data\microtransactionslotadditionaldefaultoptions.json */
    export interface Microtransactionslotadditionaldefaultoptions extends Array<MicrotransactionslotadditionaldefaultoptionsItem> {}
    
    /** Source: data\microtransactionsocialframevariations.json */
    export type Microtransactionsocialframevariations = any[];
    
    export interface MinimapiconsItem {
      Id?: string;
      MinimapIconRadius?: number;
      LargemapIconRadius?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
      MinimapIconPointerMaxDistance?: number;
      Unk007?: number;
    }
    /** Source: data\minimapicons.json */
    export interface Minimapicons extends Array<MinimapiconsItem> {}
    
    /** Source: data\minioncommands.json */
    export type Minioncommands = any[];
    
    /** Source: data\miniongemlevelscaling.json */
    export type Miniongemlevelscaling = any[];
    
    /** Source: data\minionstats.json */
    export type Minionstats = any[];
    
    export interface MiniontypeItem {
      Id?: string;
      Unk001?: any;
      Unk002?: MiniontypeItem_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
    }
    export interface MiniontypeItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\miniontype.json */
    export interface Miniontype extends Array<MiniontypeItem> {}
    
    export interface MiniqueststatesItem {
      Unk000?: number;
      Unk001?: any[];
      Unk002?: number[];
      Unk003?: number;
    }
    /** Source: data\miniqueststates.json */
    export interface Miniqueststates extends Array<MiniqueststatesItem> {}
    
    export interface MiscanimatedItem {
      Id?: string;
      AOFile?: string;
      PreloadGroupsKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      HASH32?: number;
    }
    /** Source: data\miscanimated.json */
    export interface Miscanimated extends Array<MiscanimatedItem> {}
    
    export interface MiscanimatedartvariationsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    /** Source: data\miscanimatedartvariations.json */
    export interface Miscanimatedartvariations extends Array<MiscanimatedartvariationsItem> {}
    
    export interface MiscbeamsItem {
      Id?: string;
      MiscAnimated?: MiscbeamsItem_MiscAnimated;
      Unk002?: number;
      PreloadGroupsKeys?: any[];
      Unk004?: number;
    }
    export interface MiscbeamsItem_MiscAnimated {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\miscbeams.json */
    export interface Miscbeams extends Array<MiscbeamsItem> {}
    
    export interface MiscbeamsartvariationsItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    /** Source: data\miscbeamsartvariations.json */
    export interface Miscbeamsartvariations extends Array<MiscbeamsartvariationsItem> {}
    
    /** Source: data\misccooldowns.json */
    export type Misccooldowns = any[];
    
    export interface MisceffectpacksItem {
      Id?: string;
      EPKFile?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      PreloadGroups?: any[];
      Unk006?: boolean;
      PlayerOnly_EPKFile?: string;
      Unk008?: boolean;
    }
    /** Source: data\misceffectpacks.json */
    export interface Misceffectpacks extends Array<MisceffectpacksItem> {}
    
    export interface MisceffectpacksartvariationsItem {
      Unk000?: string;
      Unk001?: number[];
      Unk002?: number;
    }
    /** Source: data\misceffectpacksartvariations.json */
    export interface Misceffectpacksartvariations extends Array<MisceffectpacksartvariationsItem> {}
    
    export interface MiscobjectsItem {
      Id?: string;
      EffectVirtualPath?: string;
      PreloadGroupsKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    /** Source: data\miscobjects.json */
    export interface Miscobjects extends Array<MiscobjectsItem> {}
    
    export interface MiscobjectsartvariationsItem {
      Unk000?: string;
      Unk001?: number[];
      Unk002?: number;
      Unk003?: number;
      Unk004?: any;
    }
    /** Source: data\miscobjectsartvariations.json */
    export interface Miscobjectsartvariations extends Array<MiscobjectsartvariationsItem> {}
    
    /** Source: data\miscprojectilemod.json */
    export type Miscprojectilemod = any[];
    
    /** Source: data\miscprojectilemodartvariations.json */
    export type Miscprojectilemodartvariations = any[];
    
    /** Source: data\missiontilemap.json */
    export type Missiontilemap = any[];
    
    export interface MissiontimertypesItem {
      Id?: string;
      Image?: string;
      BackgroundImage?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: any;
      Unk006?: any;
    }
    /** Source: data\missiontimertypes.json */
    export interface Missiontimertypes extends Array<MissiontimertypesItem> {}
    
    /** Source: data\missiontransitiontiles.json */
    export type Missiontransitiontiles = any[];
    
    /** Source: data\mobileactoneatlasquestprogression.json */
    export type Mobileactoneatlasquestprogression = any[];
    
    /** Source: data\mobileascendancythresholds.json */
    export type Mobileascendancythresholds = any[];
    
    /** Source: data\mobileatlaseldermemories.json */
    export type Mobileatlaseldermemories = any[];
    
    /** Source: data\mobileatlasinventorylayout.json */
    export type Mobileatlasinventorylayout = any[];
    
    /** Source: data\mobilecharactercreation.json */
    export type Mobilecharactercreation = any[];
    
    /** Source: data\mobilequestaudio.json */
    export type Mobilequestaudio = any[];
    
    /** Source: data\mobileskillgemlayout.json */
    export type Mobileskillgemlayout = any[];
    
    /** Source: data\mobileskillgemlayoutpages.json */
    export type Mobileskillgemlayoutpages = any[];
    
    /** Source: data\mobiletutorial.json */
    export type Mobiletutorial = any[];
    
    /** Source: data\mobiletutorialgroup.json */
    export type Mobiletutorialgroup = any[];
    
    /** Source: data\modeffectstats.json */
    export type Modeffectstats = any[];
    
    export interface ModequivalenciesItem {
      Id?: string;
      ModsKey0?: ModequivalenciesItem_ModsKey0;
      ModsKey1?: ModequivalenciesItem_ModsKey1;
      ModsKey2?: ModequivalenciesItem_ModsKey2;
      Unk004?: boolean;
    }
    export interface ModequivalenciesItem_ModsKey0 {
      TableName?: string;
      Id?: string;
    }
    export interface ModequivalenciesItem_ModsKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface ModequivalenciesItem_ModsKey2 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\modequivalencies.json */
    export interface Modequivalencies extends Array<ModequivalenciesItem> {}
    
    export interface ModfamilyItem {
      Id?: string;
    }
    /** Source: data\modfamily.json */
    export interface Modfamily extends Array<ModfamilyItem> {}
    
    /** Source: data\modgrantedskills.json */
    export type Modgrantedskills = any[];
    
    export interface ModsItem {
      Id?: string;
      HASH16?: number;
      ModTypeKey?: ModsItem_ModTypeKey;
      Level?: number;
      StatsKey1?: ModsItem_StatsKey1;
      StatsKey2?: any;
      StatsKey3?: any;
      StatsKey4?: any;
      Domain?: number;
      Name?: string;
      GenerationType?: number;
      Families?: ModsItem_Families;
      Stat1Min?: number;
      Stat1Max?: number;
      Stat2Min?: number;
      Stat2Max?: number;
      Stat3Min?: number;
      Stat3Max?: number;
      Stat4Min?: number;
      Stat4Max?: number;
      SpawnWeight_TagsKeys?: any[];
      SpawnWeight_Values?: any[];
      TagsKeys?: any[];
      GrantedEffectsPerLevelKeys?: any[];
      Unk024?: any[];
      MonsterMetadata?: string;
      MonsterKillAchievements?: any[];
      ChestModType?: any[];
      Stat5Min?: number;
      Stat5Max?: number;
      StatsKey5?: any;
      FullAreaClear_AchievementItemsKey?: any[];
      AchievementItemsKey?: any[];
      GenerationWeight_TagsKeys?: any[];
      GenerationWeight_Values?: any[];
      ModifyMapsAchievements?: any[];
      IsEssenceOnlyModifier?: boolean;
      Stat6Min?: number;
      Stat6Max?: number;
      StatsKey6?: any;
      MaxLevel?: number;
      Unk041?: boolean;
      CraftingItemClassRestrictions?: any[];
      MonsterOnDeath?: string;
      Unk044?: number;
      Unk045?: any[];
      Heist_SubStatValue1?: number;
      Heist_SubStatValue2?: number;
      Heist_StatsKey0?: any;
      Heist_StatsKey1?: any;
      Heist_AddStatValue1?: number;
      Heist_AddStatValue2?: number;
      InfluenceTypes?: number;
      ImplicitTagsKeys?: ModsItem_ImplicitTagsKeys;
      Unk054?: boolean;
      Unk055?: number;
      Unk056?: number;
      Unk057?: number;
      Unk058?: number;
      Unk059?: number;
      Unk060?: number;
      Unk061?: number;
      Unk062?: number;
      Unk063?: number;
      Unk064?: number;
      Unk065?: number;
      Unk066?: number;
      Unk067?: number;
      Unk068?: number;
      Unk069?: number;
      Unk070?: number;
      BuffTemplate?: any;
      ArchnemesisMinionMod?: any;
      HASH32?: number;
      Unk074?: any[];
      Unk075?: number;
      Unk076?: any[];
    }
    export interface ModsItem_ModTypeKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface ModsItem_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface ModsItem_FamiliesItem {
      TableName?: string;
      Id?: string;
    }
    export interface ModsItem_Families extends Array<ModsItem_FamiliesItem> {}
    export interface ModsItem_ImplicitTagsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ModsItem_ImplicitTagsKeys extends Array<ModsItem_ImplicitTagsKeysItem> {}
    /** Source: data\mods.json */
    export interface Mods extends Array<ModsItem> {}
    
    export interface ModsellpricetypesItem {
      Id?: string;
    }
    /** Source: data\modsellpricetypes.json */
    export interface Modsellpricetypes extends Array<ModsellpricetypesItem> {}
    
    export interface ModtypeItem {
      Name?: string;
      ModSellPriceTypesKeys?: ModtypeItem_ModSellPriceTypesKeys;
      Unk002?: boolean;
    }
    export interface ModtypeItem_ModSellPriceTypesKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ModtypeItem_ModSellPriceTypesKeys extends Array<ModtypeItem_ModSellPriceTypesKeysItem> {}
    /** Source: data\modtype.json */
    export interface Modtype extends Array<ModtypeItem> {}
    
    export interface MonsterarmoursItem {
      Id?: string;
      ArtString_SMFile?: string;
    }
    /** Source: data\monsterarmours.json */
    export interface Monsterarmours extends Array<MonsterarmoursItem> {}
    
    /** Source: data\monsterbonuses.json */
    export type Monsterbonuses = any[];
    
    export interface MonsterconditionaleffectpacksItem {
      Id?: string;
      MiscEffectPack1?: MonsterconditionaleffectpacksItem_MiscEffectPack1;
      MiscEffectPack2?: MonsterconditionaleffectpacksItem_MiscEffectPack2;
      MiscEffectPack3?: any[];
      MiscEffectPack4?: any[];
      Unk005?: number;
    }
    export interface MonsterconditionaleffectpacksItem_MiscEffectPack1Item {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterconditionaleffectpacksItem_MiscEffectPack1 extends Array<MonsterconditionaleffectpacksItem_MiscEffectPack1Item> {}
    export interface MonsterconditionaleffectpacksItem_MiscEffectPack2Item {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterconditionaleffectpacksItem_MiscEffectPack2 extends Array<MonsterconditionaleffectpacksItem_MiscEffectPack2Item> {}
    /** Source: data\monsterconditionaleffectpacks.json */
    export interface Monsterconditionaleffectpacks extends Array<MonsterconditionaleffectpacksItem> {}
    
    export interface MonsterconditionsItem {
      Id?: string;
      Unk001?: MonsterconditionsItem_Unk001;
      Unk002?: any;
      Unk003?: any;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: any[];
      Unk008?: any[];
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
    }
    export interface MonsterconditionsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\monsterconditions.json */
    export interface Monsterconditions extends Array<MonsterconditionsItem> {}
    
    /** Source: data\monsterdeathachievements.json */
    export type Monsterdeathachievements = any[];
    
    export interface MonsterdeathconditionsItem {
      Unk000?: string;
      Unk001?: any[];
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: MonsterdeathconditionsItem_Unk007;
      Unk008?: boolean;
      Unk009?: any[];
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: any[];
      Unk013?: number;
      Unk014?: any;
      Unk015?: any;
      Unk016?: number;
      Unk017?: number;
    }
    export interface MonsterdeathconditionsItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\monsterdeathconditions.json */
    export interface Monsterdeathconditions extends Array<MonsterdeathconditionsItem> {}
    
    /** Source: data\monsterencounterskillgroups.json */
    export type Monsterencounterskillgroups = any[];
    
    export interface MonstergroupentriesItem {
      Id?: string;
      MonsterVarietiesKey?: MonstergroupentriesItem_MonsterVarietiesKey;
      MonsterGroupNamesId?: number;
    }
    export interface MonstergroupentriesItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monstergroupentries.json */
    export interface Monstergroupentries extends Array<MonstergroupentriesItem> {}
    
    export interface MonsterheightbracketsItem {
      Id?: string;
      Unk001?: number;
      BuffVisuals1?: MonsterheightbracketsItem_BuffVisuals1;
      BuffVisuals2?: MonsterheightbracketsItem_BuffVisuals2;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Tag?: MonsterheightbracketsItem_Tag;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
    }
    export interface MonsterheightbracketsItem_BuffVisuals1 {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterheightbracketsItem_BuffVisuals2 {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterheightbracketsItem_Tag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monsterheightbrackets.json */
    export interface Monsterheightbrackets extends Array<MonsterheightbracketsItem> {}
    
    export interface MonsterheightsItem {
      MonsterVariety?: MonsterheightsItem_MonsterVariety;
      Unk001?: number;
      MonsterHeightBracket?: MonsterheightsItem_MonsterHeightBracket;
      Unk003?: number;
      Unk004?: number;
    }
    export interface MonsterheightsItem_MonsterVariety {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterheightsItem_MonsterHeightBracket {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monsterheights.json */
    export interface Monsterheights extends Array<MonsterheightsItem> {}
    
    export interface MonstermapbossdifficultyItem {
      MapLevel?: number;
      Stat1Value?: number;
      Stat2Value?: number;
      StatsKey1?: MonstermapbossdifficultyItem_StatsKey1;
      StatsKey2?: MonstermapbossdifficultyItem_StatsKey2;
      StatsKey3?: MonstermapbossdifficultyItem_StatsKey3;
      Stat3Value?: number;
      StatsKey4?: MonstermapbossdifficultyItem_StatsKey4;
      Stat4Value?: number;
      StatsKey5?: MonstermapbossdifficultyItem_StatsKey5;
      Stat5Value?: number;
    }
    export interface MonstermapbossdifficultyItem_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface MonstermapbossdifficultyItem_StatsKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface MonstermapbossdifficultyItem_StatsKey3 {
      TableName?: string;
      Id?: string;
    }
    export interface MonstermapbossdifficultyItem_StatsKey4 {
      TableName?: string;
      Id?: string;
    }
    export interface MonstermapbossdifficultyItem_StatsKey5 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monstermapbossdifficulty.json */
    export interface Monstermapbossdifficulty extends Array<MonstermapbossdifficultyItem> {}
    
    export interface MonstermapdifficultyItem {
      MapLevel?: number;
      Stat1Value?: number;
      Stat2Value?: number;
      StatsKey1?: MonstermapdifficultyItem_StatsKey1;
      StatsKey2?: MonstermapdifficultyItem_StatsKey2;
      StatsKey3?: any;
      Stat3Value?: number;
      StatsKey4?: any;
      Stat4Value?: number;
    }
    export interface MonstermapdifficultyItem_StatsKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface MonstermapdifficultyItem_StatsKey2 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monstermapdifficulty.json */
    export interface Monstermapdifficulty extends Array<MonstermapdifficultyItem> {}
    
    export interface MonstermortarItem {
      Id?: number;
      Unk001?: MonstermortarItem_Unk001;
      Unk002?: MonstermortarItem_Unk002;
      Unk003?: MonstermortarItem_Unk003;
      Unk004?: number;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: boolean;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: any;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: boolean;
      Unk022?: any;
      Unk023?: string;
    }
    export interface MonstermortarItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MonstermortarItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MonstermortarItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\monstermortar.json */
    export interface Monstermortar extends Array<MonstermortarItem> {}
    
    /** Source: data\monsterpackcounts.json */
    export type Monsterpackcounts = any[];
    
    /** Source: data\monsterpackentries.json */
    export type Monsterpackentries = any[];
    
    export interface MonsterpacksItem {
      Id?: string;
      Unk001?: number;
      WorldAreasKeys?: any[];
      Unk003?: number;
      Unk004?: number;
      BossMonsterSpawnChance?: number;
      BossMonsterCount?: number;
      BossMonster_MonsterVarietiesKeys?: any[];
      Unk008?: boolean;
      Unk009?: any[];
      Unk010?: any[];
      TagsKeys?: any[];
      MinLevel?: number;
      MaxLevel?: number;
      WorldAreas2?: any[];
      Unk015?: number;
      PackFormation?: any;
      Unk017?: number;
      Unk018?: boolean;
      Unk019?: any[];
      Unk020?: boolean;
      Unk021?: boolean;
      Unk022?: boolean;
      Unk023?: boolean;
      Unk024?: any[];
      NecropolisPack?: MonsterpacksItem_NecropolisPack;
    }
    export interface MonsterpacksItem_NecropolisPack {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\monsterpacks.json */
    export interface Monsterpacks extends Array<MonsterpacksItem> {}
    
    export interface MonsterprojectileattackItem {
      Id?: number;
      Projectile?: MonsterprojectileattackItem_Projectile;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
    }
    export interface MonsterprojectileattackItem_Projectile {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monsterprojectileattack.json */
    export interface Monsterprojectileattack extends Array<MonsterprojectileattackItem> {}
    
    export interface MonsterprojectilespellItem {
      Id?: number;
      Projectile?: MonsterprojectilespellItem_Projectile;
      Animation?: MonsterprojectilespellItem_Animation;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: boolean;
    }
    export interface MonsterprojectilespellItem_Projectile {
      TableName?: string;
      Id?: string;
    }
    export interface MonsterprojectilespellItem_Animation {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monsterprojectilespell.json */
    export interface Monsterprojectilespell extends Array<MonsterprojectilespellItem> {}
    
    export interface MonsterresistancesItem {
      Id?: string;
      FireNormal?: number;
      ColdNormal?: number;
      LightningNormal?: number;
      ChaosNormal?: number;
      FireCruel?: number;
      ColdCruel?: number;
      LightningCruel?: number;
      ChaosCruel?: number;
      FireMerciless?: number;
      ColdMerciless?: number;
      LightningMerciless?: number;
      ChaosMerciless?: number;
    }
    /** Source: data\monsterresistances.json */
    export interface Monsterresistances extends Array<MonsterresistancesItem> {}
    
    export interface MonstersegmentsItem {
      Id?: string;
      Shapes?: string;
    }
    /** Source: data\monstersegments.json */
    export interface Monstersegments extends Array<MonstersegmentsItem> {}
    
    /** Source: data\monstershapeshift.json */
    export type Monstershapeshift = any[];
    
    export interface MonsterspawnergroupsItem {
      Id?: string;
    }
    /** Source: data\monsterspawnergroups.json */
    export interface Monsterspawnergroups extends Array<MonsterspawnergroupsItem> {}
    
    export interface MonsterspawnergroupsperlevelItem {
      MonsterSpawnerGroupsKey?: MonsterspawnergroupsperlevelItem_MonsterSpawnerGroupsKey;
      MinLevel?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    export interface MonsterspawnergroupsperlevelItem_MonsterSpawnerGroupsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monsterspawnergroupsperlevel.json */
    export interface Monsterspawnergroupsperlevel extends Array<MonsterspawnergroupsperlevelItem> {}
    
    /** Source: data\monsterspawneroverrides.json */
    export type Monsterspawneroverrides = any[];
    
    export interface MonstertypesItem {
      Id?: string;
      Unk001?: number;
      IsSummoned?: boolean;
      Armour?: number;
      Evasion?: number;
      EnergyShieldFromLife?: number;
      DamageSpread?: number;
      MonsterResistancesKey?: MonstertypesItem_MonsterResistancesKey;
      IsLargeAbyssMonster?: boolean;
      IsSmallAbyssMonster?: boolean;
      Unk010?: boolean;
    }
    export interface MonstertypesItem_MonsterResistancesKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\monstertypes.json */
    export interface Monstertypes extends Array<MonstertypesItem> {}
    
    export interface MonstervarietiesItem {
      Id?: string;
      MonsterTypesKey?: MonstervarietiesItem_MonsterTypesKey;
      Unk002?: number;
      ObjectSize?: number;
      MinimumAttackDistance?: number;
      MaximumAttackDistance?: number;
      ACTFiles?: any[];
      AOFiles?: any[];
      BaseMonsterTypeIndex?: string;
      ModsKeys?: any[];
      Unk010?: number;
      Unk011?: string;
      Unk012?: string;
      ModelSizeMultiplier?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: number;
      TagsKeys?: any[];
      ExperienceMultiplier?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      CriticalStrikeChance?: number;
      Unk026?: number;
      GrantedEffectsKeys?: any[];
      AISFile?: string;
      ModsKeys2?: MonstervarietiesItem_ModsKeys2;
      Stance?: string;
      Unk031?: MonstervarietiesItem_Unk031;
      Name?: string;
      DamageMultiplier?: number;
      LifeMultiplier?: number;
      AttackSpeed?: number;
      Weapon1_ItemVisualIdentityKeys?: any[];
      Weapon2_ItemVisualIdentityKeys?: any[];
      Back_ItemVisualIdentityKey?: MonstervarietiesItem_Back_ItemVisualIdentityKey;
      MainHand_ItemClassesKey?: MonstervarietiesItem_MainHand_ItemClassesKey;
      OffHand_ItemClassesKey?: any;
      Helmet_ItemVisualIdentityKey?: any;
      Unk042?: number;
      KillSpecificMonsterCount_AchievementItemsKeys?: any;
      Special_ModsKeys?: any[];
      Unk046?: boolean;
      Unk047?: number;
      Unk048?: number;
      Unk049?: number;
      Unk050?: number;
      Unk051?: number;
      Unk052?: number;
      HASH16?: number;
      Unk054?: boolean;
      Unk055?: any;
      KillWhileOnslaughtIsActive_AchievementItemsKey?: MonstervarietiesItem_KillWhileOnslaughtIsActive_AchievementItemsKey;
      MonsterSegmentsKey?: MonstervarietiesItem_MonsterSegmentsKey;
      MonsterArmoursKey?: any;
      KillWhileTalismanIsActive_AchievementItemsKey?: any;
      Part1_ModsKeys?: any;
      Part2_ModsKeys?: any[];
      Endgame_ModsKeys?: any[];
      Unk063?: MonstervarietiesItem_Unk063;
      Unk064?: number;
      Unk065?: number;
      Unk066?: any;
      Unk067?: any[];
      Unk068?: number;
      SinkAnimation_AOFile?: string;
      Unk070?: boolean;
      Unk071?: any[];
      Unk072?: boolean;
      Unk073?: boolean;
      Unk074?: boolean;
      Unk075?: number;
      Unk076?: number;
      Unk077?: number;
      Unk078?: number;
      EPKFile?: any;
      Unk080?: number;
      MonsterConditionalEffectPacksKey?: MonstervarietiesItem_MonsterConditionalEffectPacksKey;
      Unk082?: boolean;
      Unk083?: boolean;
      Unk084?: number;
      Unk085?: boolean;
      Unk086?: number;
      Unk087?: number;
      Unk088?: number;
      Unk089?: number;
      Unk090?: number;
      Unk091?: number;
      AddonMonsterTypeIndex?: any[];
      Unk093?: number;
      Unk094?: number;
      Unk095?: number;
      Unk096?: number;
      Unk097?: number;
      Unk098?: boolean;
      BossHealthBar?: boolean;
      Unk100?: boolean;
    }
    export interface MonstervarietiesItem_MonsterTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface MonstervarietiesItem_ModsKeys2Item {
      TableName?: string;
      Id?: string;
    }
    export interface MonstervarietiesItem_ModsKeys2 extends Array<MonstervarietiesItem_ModsKeys2Item> {}
    export interface MonstervarietiesItem_Unk031 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MonstervarietiesItem_Back_ItemVisualIdentityKey {
      TableName?: string;
      Id?: string;
    }
    export interface MonstervarietiesItem_MainHand_ItemClassesKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface MonstervarietiesItem_KillWhileOnslaughtIsActive_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    export interface MonstervarietiesItem_MonsterSegmentsKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface MonstervarietiesItem_Unk063 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MonstervarietiesItem_MonsterConditionalEffectPacksKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\monstervarieties.json */
    export interface Monstervarieties extends Array<MonstervarietiesItem> {}
    
    export interface MonstervarietiesartvariationsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number[];
    }
    /** Source: data\monstervarietiesartvariations.json */
    export interface Monstervarietiesartvariations extends Array<MonstervarietiesartvariationsItem> {}
    
    export interface MousecursorsizesettingsItem {
      Size?: string;
      Description?: string;
      Ratio?: number;
    }
    /** Source: data\mousecursorsizesettings.json */
    export interface Mousecursorsizesettings extends Array<MousecursorsizesettingsItem> {}
    
    export interface MovedaemonItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: MovedaemonItem_Unk006;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
      Unk014?: number;
      Unk015?: number;
      Unk016?: boolean;
      Unk017?: boolean;
      Unk018?: boolean;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: any;
      Unk027?: number;
      Unk028?: boolean;
      Unk029?: boolean;
      Unk030?: number;
      Unk031?: number;
      Unk032?: boolean;
    }
    export interface MovedaemonItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\movedaemon.json */
    export interface Movedaemon extends Array<MovedaemonItem> {}
    
    export interface MtxsetbonusItem {
      Id?: string;
      Unk001?: MtxsetbonusItem_Unk001;
      Unk002?: MtxsetbonusItem_Unk002;
      Unk003?: MtxsetbonusItem_Unk003;
      Unk004?: MtxsetbonusItem_Unk004;
      Unk005?: MtxsetbonusItem_Unk005;
    }
    export interface MtxsetbonusItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MtxsetbonusItem_Unk002Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MtxsetbonusItem_Unk002 extends Array<MtxsetbonusItem_Unk002Item> {}
    export interface MtxsetbonusItem_Unk003Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MtxsetbonusItem_Unk003 extends Array<MtxsetbonusItem_Unk003Item> {}
    export interface MtxsetbonusItem_Unk004Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MtxsetbonusItem_Unk004 extends Array<MtxsetbonusItem_Unk004Item> {}
    export interface MtxsetbonusItem_Unk005Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface MtxsetbonusItem_Unk005 extends Array<MtxsetbonusItem_Unk005Item> {}
    /** Source: data\mtxsetbonus.json */
    export interface Mtxsetbonus extends Array<MtxsetbonusItem> {}
    
    export interface MultipartachievementareasItem {
      Unk000?: MultipartachievementareasItem_Unk000;
      Unk001?: any[];
      Unk002?: number;
    }
    export interface MultipartachievementareasItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\multipartachievementareas.json */
    export interface Multipartachievementareas extends Array<MultipartachievementareasItem> {}
    
    export interface MultipartachievementconditionsItem {
      Id?: string;
      MultiPartAchievementsKey1?: any;
      MultiPartAchievementsKey2?: MultipartachievementconditionsItem_MultiPartAchievementsKey2;
      Unk003?: number;
      Unk004?: number;
    }
    export interface MultipartachievementconditionsItem_MultiPartAchievementsKey2 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\multipartachievementconditions.json */
    export interface Multipartachievementconditions extends Array<MultipartachievementconditionsItem> {}
    
    export interface MultipartachievementsItem {
      Id?: string;
      Unk001?: number;
      AchievementItemsKey?: MultipartachievementsItem_AchievementItemsKey;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: number;
    }
    export interface MultipartachievementsItem_AchievementItemsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\multipartachievements.json */
    export interface Multipartachievements extends Array<MultipartachievementsItem> {}
    
    export interface MusicItem {
      Id?: string;
      SoundFile?: string;
      BankFile?: string;
      HASH16?: number;
      IsAvailableInHideout?: boolean;
      Name?: string;
      Unk006?: string;
      MusicCategories?: MusicItem_MusicCategories;
      Unk008?: boolean;
      Unk009?: number;
    }
    export interface MusicItem_MusicCategoriesItem {
      TableName?: string;
      Id?: string;
    }
    export interface MusicItem_MusicCategories extends Array<MusicItem_MusicCategoriesItem> {}
    /** Source: data\music.json */
    export interface Music extends Array<MusicItem> {}
    
    export interface MusiccategoriesItem {
      Id?: string;
      Name?: string;
      Order?: number;
      Unk003?: boolean;
    }
    /** Source: data\musiccategories.json */
    export interface Musiccategories extends Array<MusiccategoriesItem> {}
    
    export interface MysteryboxesItem {
      BaseItemTypesKey?: MysteryboxesItem_BaseItemTypesKey;
      BK2File?: string;
      BoxId?: string;
      BundleId?: string;
      Unk004?: boolean;
    }
    export interface MysteryboxesItem_BaseItemTypesKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\mysteryboxes.json */
    export interface Mysteryboxes extends Array<MysteryboxesItem> {}
    
    export interface NearbymonsterconditionsItem {
      Id?: string;
      MonsterVarietiesKeys?: any[];
      MonsterAmount?: number;
      Unk003?: number;
      IsNegated?: boolean;
      Unk005?: number;
      Unk006?: any[];
      IsLessThen?: boolean;
      MinimumHealthPercentage?: number;
    }
    /** Source: data\nearbymonsterconditions.json */
    export interface Nearbymonsterconditions extends Array<NearbymonsterconditionsItem> {}
    
    export interface NettiersItem {
      BaseItemTypesKey?: NettiersItem_BaseItemTypesKey;
      Tier?: number;
    }
    export interface NettiersItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\nettiers.json */
    export interface Nettiers extends Array<NettiersItem> {}
    
    export interface NotificationsItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Message?: string;
      Unk004?: string;
      Unk005?: number;
      Unk006?: boolean;
      Unk007?: boolean;
    }
    /** Source: data\notifications.json */
    export interface Notifications extends Array<NotificationsItem> {}
    
    export interface NpcaudioItem {
      Id?: string;
      Unk001?: number[];
      Unk002?: any[];
      VolumePercentage?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: NpcaudioItem_Unk008;
      Unk009?: number;
      Unk010?: number;
    }
    export interface NpcaudioItem_Unk008 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\npcaudio.json */
    export interface Npcaudio extends Array<NpcaudioItem> {}
    
    export interface NpcconversationsItem {
      Id?: string;
      DialogueEvent?: NpcconversationsItem_DialogueEvent;
      NPCTextAudioKeys?: NpcconversationsItem_NPCTextAudioKeys;
      Unk003?: number[];
      Unk004?: number;
    }
    export interface NpcconversationsItem_DialogueEvent {
      TableName?: string;
      Id?: string;
    }
    export interface NpcconversationsItem_NPCTextAudioKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface NpcconversationsItem_NPCTextAudioKeys extends Array<NpcconversationsItem_NPCTextAudioKeysItem> {}
    /** Source: data\npcconversations.json */
    export interface Npcconversations extends Array<NpcconversationsItem> {}
    
    /** Source: data\npcdialoguecutscene.json */
    export type Npcdialoguecutscene = any[];
    
    /** Source: data\npcdialoguecutscenesequences.json */
    export type Npcdialoguecutscenesequences = any[];
    
    export interface NpcdialoguestylesItem {
      Id?: string;
      HeaderBaseFile?: string;
      ButtomFile?: string;
      BannerFiles?: any[];
      HeaderFiles?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: any[];
      Unk011?: NpcdialoguestylesItem_Unk011;
      Unk012?: string;
      Unk013?: any[];
      Unk014?: any[];
      Unk015?: number;
      Unk016?: number;
      Unk017?: number;
      Unk018?: string;
      Unk019?: string;
      Unk020?: number;
      Unk021?: number;
    }
    export interface NpcdialoguestylesItem_Unk011 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\npcdialoguestyles.json */
    export interface Npcdialoguestyles extends Array<NpcdialoguestylesItem> {}
    
    export interface NpcfollowervariationsItem {
      MonsterVarietiesKey?: NpcfollowervariationsItem_MonsterVarietiesKey;
      MiscAnimatedKey0?: NpcfollowervariationsItem_MiscAnimatedKey0;
      MiscAnimatedKey1?: NpcfollowervariationsItem_MiscAnimatedKey1;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: any[];
      Unk012?: any[];
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: number;
    }
    export interface NpcfollowervariationsItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    export interface NpcfollowervariationsItem_MiscAnimatedKey0 {
      TableName?: string;
      Id?: string;
    }
    export interface NpcfollowervariationsItem_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\npcfollowervariations.json */
    export interface Npcfollowervariations extends Array<NpcfollowervariationsItem> {}
    
    /** Source: data\npcmaster.json */
    export type Npcmaster = any[];
    
    /** Source: data\npcportraitaooverrides.json */
    export type Npcportraitaooverrides = any[];
    
    export interface NpcportraitsItem {
      Name?: string;
      PortraitFile?: string;
      Unk002?: number;
      Unk003?: number;
    }
    /** Source: data\npcportraits.json */
    export interface Npcportraits extends Array<NpcportraitsItem> {}
    
    export interface NpcsItem {
      Id?: string;
      Name?: string;
      Metadata?: string;
      Unk003?: any;
      NPCMasterKey?: any;
      ShortName?: string;
      Unk006?: number;
      NPCAudios1?: any[];
      NPCAudios2?: any[];
      HASH16?: number;
      Unk010?: any;
      Portrait?: any;
      DialogueStyle?: any;
      Unk013?: boolean;
      Unk014?: any;
      Gender?: any;
      Unk016?: boolean;
    }
    /** Source: data\npcs.json */
    export interface Npcs extends Array<NpcsItem> {}
    
    export interface NpcshopItem {
      Id?: string;
      Unk001?: number;
      Unk002?: any[];
    }
    /** Source: data\npcshop.json */
    export interface Npcshop extends Array<NpcshopItem> {}
    
    /** Source: data\npcshopgamblervisualidentity.json */
    export type Npcshopgamblervisualidentity = any[];
    
    /** Source: data\npcshops.json */
    export type Npcshops = any[];
    
    export interface NpctalkItem {
      NPCKey?: NpctalkItem_NPCKey;
      Unk001?: number;
      DialogueOption?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number[];
      Script?: string;
      TextAudio?: NpctalkItem_TextAudio;
      Category?: NpctalkItem_Category;
      QuestRewardOffersKey?: any;
      QuestFlag?: NpctalkItem_QuestFlag;
      NPCTextAudioKeys?: NpctalkItem_NPCTextAudioKeys;
      Script2?: string;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: number[];
      Unk016?: any[];
      Unk017?: number;
      Unk018?: any[];
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: any;
      Unk022?: number;
      Unk023?: boolean;
      DialogueOption2?: any;
      Unk025?: NpctalkItem_Unk025;
      Unk026?: any;
      Unk027?: any;
      Unk028?: number;
      Unk029?: number;
      Unk030?: number;
      Unk031?: number;
      Unk032?: NpctalkItem_Unk032;
      Unk033?: number;
      Unk034?: any;
      Unk035?: boolean;
      Unk036?: number;
      Unk037?: NpctalkItem_Unk037;
    }
    export interface NpctalkItem_NPCKey {
      TableName?: string;
      Id?: string;
    }
    export interface NpctalkItem_TextAudio {
      TableName?: string;
      Id?: string;
    }
    export interface NpctalkItem_Category {
      TableName?: string;
      Id?: string;
    }
    export interface NpctalkItem_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface NpctalkItem_NPCTextAudioKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface NpctalkItem_NPCTextAudioKeys extends Array<NpctalkItem_NPCTextAudioKeysItem> {}
    export interface NpctalkItem_Unk025 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface NpctalkItem_Unk032 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface NpctalkItem_Unk037 {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\npctalk.json */
    export interface Npctalk extends Array<NpctalkItem> {}
    
    export interface NpctalkcategoryItem {
      Id?: string;
      Unk001?: boolean;
    }
    /** Source: data\npctalkcategory.json */
    export interface Npctalkcategory extends Array<NpctalkcategoryItem> {}
    
    export interface NpctalkconsolequickactionsItem {
      Id?: string;
      Controller?: string;
      Unk002?: string;
    }
    /** Source: data\npctalkconsolequickactions.json */
    export interface Npctalkconsolequickactions extends Array<NpctalkconsolequickactionsItem> {}
    
    /** Source: data\npctalkmobilegroup.json */
    export type Npctalkmobilegroup = any[];
    
    /** Source: data\npctype.json */
    export type Npctype = any[];
    
    /** Source: data\npcvendordialogue.json */
    export type Npcvendordialogue = any[];
    
    /** Source: data\npcvendordialogueconditions.json */
    export type Npcvendordialogueconditions = any[];
    
    /** Source: data\ongoingbuffvariations.json */
    export type Ongoingbuffvariations = any[];
    
    /** Source: data\ongoingtriggervariations.json */
    export type Ongoingtriggervariations = any[];
    
    /** Source: data\onkillachievements.json */
    export type Onkillachievements = any[];
    
    export interface PackformationItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    /** Source: data\packformation.json */
    export interface Packformation extends Array<PackformationItem> {}
    
    /** Source: data\pantheonpanellayout.json */
    export type Pantheonpanellayout = any[];
    
    /** Source: data\pantheonsouls.json */
    export type Pantheonsouls = any[];
    
    export interface PassivejewelartItem {
      Unk000?: PassivejewelartItem_Unk000;
      Unk001?: string;
      Unk002?: string;
      Unk003?: any;
    }
    export interface PassivejewelartItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\passivejewelart.json */
    export interface Passivejewelart extends Array<PassivejewelartItem> {}
    
    export interface PassivejewelnodemodifyingstatsItem {
      JwelStat?: PassivejewelnodemodifyingstatsItem_JwelStat;
      Stat?: PassivejewelnodemodifyingstatsItem_Stat;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
    }
    export interface PassivejewelnodemodifyingstatsItem_JwelStat {
      TableName?: string;
      Id?: string;
    }
    export interface PassivejewelnodemodifyingstatsItem_Stat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\passivejewelnodemodifyingstats.json */
    export interface Passivejewelnodemodifyingstats extends Array<PassivejewelnodemodifyingstatsItem> {}
    
    export interface PassivejewelradiiItem {
      ID?: string;
      RingOuterRadius?: number;
      RingInnerRadius?: number;
      Radius?: number;
    }
    /** Source: data\passivejewelradii.json */
    export interface Passivejewelradii extends Array<PassivejewelradiiItem> {}
    
    /** Source: data\passivejewelslots.json */
    export type Passivejewelslots = any[];
    
    /** Source: data\passivejeweluniqueart.json */
    export type Passivejeweluniqueart = any[];
    
    export interface PassiveoverridelimitsItem {
      Id?: string;
      Description?: string;
    }
    /** Source: data\passiveoverridelimits.json */
    export interface Passiveoverridelimits extends Array<PassiveoverridelimitsItem> {}
    
    /** Source: data\passiveskillfilteroptions.json */
    export type Passiveskillfilteroptions = any[];
    
    /** Source: data\passiveskillmasteryeffects.json */
    export type Passiveskillmasteryeffects = any[];
    
    export interface PassiveskillmasterygroupsItem {
      Id?: string;
      MasteryEffects?: PassiveskillmasterygroupsItem_MasteryEffects;
      InactiveIcon?: string;
      ActiveIcon?: string;
      ActiveEffectImage?: string;
      Unk005?: boolean;
      SoundEffect?: PassiveskillmasterygroupsItem_SoundEffect;
      MasteryCountStat?: PassiveskillmasterygroupsItem_MasteryCountStat;
    }
    export interface PassiveskillmasterygroupsItem_MasteryEffectsItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface PassiveskillmasterygroupsItem_MasteryEffects extends Array<PassiveskillmasterygroupsItem_MasteryEffectsItem> {}
    export interface PassiveskillmasterygroupsItem_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    export interface PassiveskillmasterygroupsItem_MasteryCountStat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\passiveskillmasterygroups.json */
    export interface Passiveskillmasterygroups extends Array<PassiveskillmasterygroupsItem> {}
    
    /** Source: data\passiveskilloverrides.json */
    export type Passiveskilloverrides = any[];
    
    export interface PassiveskilloverridetypesItem {
      Id?: string;
      CounterStat?: any;
      Unk002?: boolean;
    }
    /** Source: data\passiveskilloverridetypes.json */
    export interface Passiveskilloverridetypes extends Array<PassiveskilloverridetypesItem> {}
    
    export interface PassiveskillsItem {
      Id?: string;
      Icon_DDSFile?: string;
      Stats?: PassiveskillsItem_Stats;
      Stat1Value?: number;
      Stat2Value?: number;
      Stat3Value?: number;
      Stat4Value?: number;
      PassiveSkillGraphId?: number;
      Name?: string;
      Characters?: any[];
      IsKeystone?: boolean;
      IsNotable?: boolean;
      FlavourText?: string;
      IsJustIcon?: boolean;
      AchievementItem?: any;
      IsJewelSocket?: boolean;
      AscendancyKey?: any;
      IsAscendancyStartingNode?: boolean;
      ReminderStrings?: any[];
      SkillPointsGranted?: number;
      IsMultipleChoice?: boolean;
      IsMultipleChoiceOption?: boolean;
      Stat5Value?: number;
      PassiveSkillBuffs?: any[];
      GrantedEffectsPerLevel?: PassiveskillsItem_GrantedEffectsPerLevel;
      IsAnointmentOnly?: boolean;
      Unk026?: number;
      IsExpansion?: boolean;
      IsProxyPassive?: boolean;
      SkillType?: number;
      MasteryGroup?: any;
      Group?: any;
      SoundEffect?: PassiveskillsItem_SoundEffect;
      Unk033?: string;
      Unk034?: number;
      Unk035?: number;
      Unk036?: number;
      Unk037?: number;
      Unk038?: number;
      Unk039?: boolean;
      Unk040?: any[];
      Unk041?: number;
      Unk042?: any;
      Unk043?: boolean;
      Unk044?: any;
      Unk045?: any;
    }
    export interface PassiveskillsItem_StatsItem {
      TableName?: string;
      Id?: string;
    }
    export interface PassiveskillsItem_Stats extends Array<PassiveskillsItem_StatsItem> {}
    export interface PassiveskillsItem_GrantedEffectsPerLevel {
      TableName?: string;
      RowIndex?: number;
    }
    export interface PassiveskillsItem_SoundEffect {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\passiveskills.json */
    export interface Passiveskills extends Array<PassiveskillsItem> {}
    
    export interface PassiveskillstatcategoriesItem {
      Id?: string;
      Name?: string;
    }
    /** Source: data\passiveskillstatcategories.json */
    export interface Passiveskillstatcategories extends Array<PassiveskillstatcategoriesItem> {}
    
    /** Source: data\passiveskilltrees.json */
    export type Passiveskilltrees = any[];
    
    /** Source: data\passiveskilltreetutorial.json */
    export type Passiveskilltreetutorial = any[];
    
    export interface PassiveskilltreeuiartItem {
      Id?: string;
      GroupBackgroundSmall?: string;
      GroupBackgroundMedium?: string;
      GroupBackgroundLarge?: string;
      Unk004?: boolean;
      PassiveFrameNormal?: string;
      NotableFrameNormal?: string;
      KeystoneFrameNormal?: string;
      PassiveFrameActive?: string;
      NotableFrameActive?: string;
      KeystoneFrameActive?: string;
      PassiveFrameCanAllocate?: string;
      NotableFrameCanAllocate?: string;
      KeystoneCanAllocate?: string;
      Ornament?: string;
      GroupBackgroundSmallBlank?: string;
      GroupBackgroundMediumBlank?: string;
      GroupBackgroundLargeBlank?: string;
    }
    /** Source: data\passiveskilltreeuiart.json */
    export interface Passiveskilltreeuiart extends Array<PassiveskilltreeuiartItem> {}
    
    /** Source: data\passivetreeexpansionjewels.json */
    export type Passivetreeexpansionjewels = any[];
    
    export interface PassivetreeexpansionjewelsizesItem {
      Name?: string;
    }
    /** Source: data\passivetreeexpansionjewelsizes.json */
    export interface Passivetreeexpansionjewelsizes extends Array<PassivetreeexpansionjewelsizesItem> {}
    
    /** Source: data\passivetreeexpansionskills.json */
    export type Passivetreeexpansionskills = any[];
    
    /** Source: data\passivetreeexpansionspecialskills.json */
    export type Passivetreeexpansionspecialskills = any[];
    
    export interface PcbangrewardmicrosItem {
      Unk000?: PcbangrewardmicrosItem_Unk000;
      Unk001?: number;
    }
    export interface PcbangrewardmicrosItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\pcbangrewardmicros.json */
    export interface Pcbangrewardmicros extends Array<PcbangrewardmicrosItem> {}
    
    /** Source: data\pet.json */
    export type Pet = any[];
    
    export interface PlayerconditionsItem {
      Id?: string;
      BuffDefinitionsKeys?: PlayerconditionsItem_BuffDefinitionsKeys;
      Unk002?: boolean;
      BuffStacks?: number;
      CharactersKey?: any;
      StatsKeys?: any[];
      Unk006?: boolean;
      StatValue?: number;
      Unk008?: any[];
      Unk009?: boolean;
    }
    export interface PlayerconditionsItem_BuffDefinitionsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface PlayerconditionsItem_BuffDefinitionsKeys extends Array<PlayerconditionsItem_BuffDefinitionsKeysItem> {}
    /** Source: data\playerconditions.json */
    export interface Playerconditions extends Array<PlayerconditionsItem> {}
    
    export interface PlayertradewhisperformatsItem {
      Id?: string;
      Whisper?: string;
      InStash?: boolean;
      IsPriced?: boolean;
    }
    /** Source: data\playertradewhisperformats.json */
    export interface Playertradewhisperformats extends Array<PlayertradewhisperformatsItem> {}
    
    export interface PortalaudioItem {
      Unk000?: PortalaudioItem_Unk000;
      Unk001?: PortalaudioItem_Unk001;
      Unk002?: PortalaudioItem_Unk002;
      Unk003?: number;
    }
    export interface PortalaudioItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface PortalaudioItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface PortalaudioItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\portalaudio.json */
    export interface Portalaudio extends Array<PortalaudioItem> {}
    
    export interface PortalaudioeventsItem {
      Id?: string;
      Unk001?: number;
    }
    /** Source: data\portalaudioevents.json */
    export interface Portalaudioevents extends Array<PortalaudioeventsItem> {}
    
    export interface PreloadfromstatsItem {
      Unk000?: PreloadfromstatsItem_Unk000;
      Unk001?: any[];
      Unk002?: any[];
      Unk003?: number[];
      Unk004?: any[];
      Unk005?: number;
    }
    export interface PreloadfromstatsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\preloadfromstats.json */
    export interface Preloadfromstats extends Array<PreloadfromstatsItem> {}
    
    export interface PreloadgroupsItem {
      Id?: string;
    }
    /** Source: data\preloadgroups.json */
    export interface Preloadgroups extends Array<PreloadgroupsItem> {}
    
    export interface PrimordialbosslifescalingperlevelItem {
      AreaLevel?: number;
      Scale?: number;
    }
    /** Source: data\primordialbosslifescalingperlevel.json */
    export interface Primordialbosslifescalingperlevel extends Array<PrimordialbosslifescalingperlevelItem> {}
    
    /** Source: data\projectileoverrides.json */
    export type Projectileoverrides = any[];
    
    export interface ProjectilesItem {
      Id?: string;
      AOFiles?: string[];
      LoopAnimationIds?: string[];
      ImpactAnimationIds?: string[];
      ProjectileSpeed?: number;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: boolean;
      InheritsFrom?: string;
      Unk010?: number;
      Unk011?: any;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: boolean;
      Stuck_AOFile?: any[];
      Bounce_AOFile?: string;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: ProjectilesItem_Unk021;
      Unk022?: any;
      Unk023?: number;
      Unk024?: number;
      Unk025?: number;
      Unk026?: number;
      Unk027?: number;
      Unk028?: any[];
      Unk029?: boolean;
      Unk030?: any[];
      Unk031?: any;
    }
    export interface ProjectilesItem_Unk021 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\projectiles.json */
    export interface Projectiles extends Array<ProjectilesItem> {}
    
    export interface ProjectilesartvariationsItem {
      Projectile?: string;
      Variant?: number;
      Unk002?: number[];
      Unk003?: number;
      Unk004?: any;
    }
    /** Source: data\projectilesartvariations.json */
    export interface Projectilesartvariations extends Array<ProjectilesartvariationsItem> {}
    
    export interface PvptypesItem {
      Id?: string;
      Unk001?: any;
    }
    /** Source: data\pvptypes.json */
    export interface Pvptypes extends Array<PvptypesItem> {}
    
    export interface QuestItem {
      Id?: string;
      Act?: number;
      Name?: string;
      Icon_DDSFile?: string;
      QuestId?: number;
      Unk005?: boolean;
      Type?: QuestItem_Type;
      Unk007?: any[];
      Unk008?: number;
      TrackerGroup?: any;
      Unk010?: boolean;
      Unk011?: QuestItem_Unk011;
    }
    export interface QuestItem_Type {
      TableName?: string;
      Id?: string;
    }
    export interface QuestItem_Unk011 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\quest.json */
    export interface Quest extends Array<QuestItem> {}
    
    export interface QuestachievementsItem {
      Id?: string;
      QuestStates?: number[];
      Unk002?: any[];
      AchievementItems?: any[];
      NPCs?: any[];
      Unk005?: boolean;
    }
    /** Source: data\questachievements.json */
    export interface Questachievements extends Array<QuestachievementsItem> {}
    
    export interface QuestflagsItem {
      Id?: string;
      HASH32?: number;
    }
    /** Source: data\questflags.json */
    export interface Questflags extends Array<QuestflagsItem> {}
    
    /** Source: data\questitemnpcaudio.json */
    export type Questitemnpcaudio = any[];
    
    export interface QuestitemsItem {
      Item?: QuestitemsItem_Item;
      HaveItemQuestFlag?: QuestitemsItem_HaveItemQuestFlag;
      UsedItemQuestFlag?: any;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: boolean;
      Unk006?: boolean;
      ItemDescription?: QuestitemsItem_ItemDescription;
      ItemFunction?: QuestitemsItem_ItemFunction;
      Script?: string;
      Unk010?: any;
      Unk011?: any;
      Unk012?: number;
    }
    export interface QuestitemsItem_Item {
      TableName?: string;
      Id?: string;
    }
    export interface QuestitemsItem_HaveItemQuestFlag {
      TableName?: string;
      Id?: string;
    }
    export interface QuestitemsItem_ItemDescription {
      TableName?: string;
      Id?: string;
    }
    export interface QuestitemsItem_ItemFunction {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\questitems.json */
    export interface Questitems extends Array<QuestitemsItem> {}
    
    export interface QuestrewardoffersItem {
      Id?: string;
      QuestKey?: QuestrewardoffersItem_QuestKey;
      QuestFlag?: QuestrewardoffersItem_QuestFlag;
      Unk003?: number;
      RewardWindowTake?: any;
      Unk005?: boolean;
      Unk006?: boolean;
      RewardWindowTitle?: any;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: any;
    }
    export interface QuestrewardoffersItem_QuestKey {
      TableName?: string;
      Id?: string;
    }
    export interface QuestrewardoffersItem_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\questrewardoffers.json */
    export interface Questrewardoffers extends Array<QuestrewardoffersItem> {}
    
    export interface QuestrewardsItem {
      RewardOffer?: QuestrewardsItem_RewardOffer;
      UnkLong001?: number;
      Reward?: QuestrewardsItem_Reward;
      RewardLevel?: number;
      SomeRef01?: any;
      UnkInt002?: number;
      UnkLong003?: number;
      UnkLong004?: number;
      UnkLong005?: number;
      RewardStack?: number;
      UnkInt006?: number;
      UnkInt007?: number;
      UnkShort008?: number;
      UnkLong009?: number;
      UnkLong010?: number;
      UnkLong011?: number;
      UnkLong012?: number;
      UnkInt013?: number;
      SomeRef02?: any;
      UnkLong014?: number;
      UnkInt015?: number;
      UnkLong016?: number;
      UnkInt017?: number;
      Unk018?: boolean;
    }
    export interface QuestrewardsItem_RewardOffer {
      TableName?: string;
      Id?: string;
    }
    export interface QuestrewardsItem_Reward {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\questrewards.json */
    export interface Questrewards extends Array<QuestrewardsItem> {}
    
    export interface QuestrewardtypeItem {
      Id?: string;
      Icon?: string;
      Name?: string;
      Description?: string;
      SomeRef?: QuestrewardtypeItem_SomeRef;
    }
    export interface QuestrewardtypeItem_SomeRef {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\questrewardtype.json */
    export interface Questrewardtype extends Array<QuestrewardtypeItem> {}
    
    export interface QueststatesItem {
      Quest?: QueststatesItem_Quest;
      Order?: number;
      FlagsPresent?: QueststatesItem_FlagsPresent;
      FlagsMissing?: any[];
      Text?: string;
      Unk005?: boolean;
      Message?: string;
      MapPinsKeys1?: any[];
    }
    export interface QueststatesItem_Quest {
      TableName?: string;
      Id?: string;
    }
    export interface QueststatesItem_FlagsPresentItem {
      TableName?: string;
      Id?: string;
    }
    export interface QueststatesItem_FlagsPresent extends Array<QueststatesItem_FlagsPresentItem> {}
    /** Source: data\queststates.json */
    export interface Queststates extends Array<QueststatesItem> {}
    
    export interface QueststaticrewardsItem {
      QuestFlag?: QueststaticrewardsItem_QuestFlag;
      Unk001?: number;
      StatsKeys?: any[];
      StatValues?: any[];
      QuestKey?: any;
      Unk005?: number;
      ClientStringsKey?: any;
      Unk007?: number;
      Unk008?: boolean;
    }
    export interface QueststaticrewardsItem_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\queststaticrewards.json */
    export interface Queststaticrewards extends Array<QueststaticrewardsItem> {}
    
    export interface QuesttrackergroupItem {
      Id?: string;
      Name?: string;
      QuestType?: QuesttrackergroupItem_QuestType;
    }
    export interface QuesttrackergroupItem_QuestType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\questtrackergroup.json */
    export interface Questtrackergroup extends Array<QuesttrackergroupItem> {}
    
    export interface QuesttypeItem {
      Id?: string;
      Unk001?: any[];
    }
    /** Source: data\questtype.json */
    export interface Questtype extends Array<QuesttypeItem> {}
    
    /** Source: data\racerewardtomicro.json */
    export type Racerewardtomicro = any[];
    
    /** Source: data\races.json */
    export type Races = any[];
    
    export interface RacetimesItem {
      RacesKey?: RacetimesItem_RacesKey;
      Index?: number;
      StartUNIXTime?: number;
      EndUNIXTime?: number;
    }
    export interface RacetimesItem_RacesKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\racetimes.json */
    export interface Racetimes extends Array<RacetimesItem> {}
    
    export interface RarityItem {
      Id?: string;
      MinMods?: number;
      MaxMods?: number;
      Unk003?: number;
      MaxPrefix?: number;
      Unk005?: number;
      MaxSuffix?: number;
      Color?: string;
    }
    /** Source: data\rarity.json */
    export interface Rarity extends Array<RarityItem> {}
    
    export interface RealmsItem {
      Id?: string;
      Name?: string;
      Server?: string[];
      IsEnabled?: boolean;
      Server2?: any[];
      ShortName?: string;
      Unk006?: RealmsItem_Unk006;
      Unk007?: RealmsItem_Unk007;
      Unk008?: number;
      IsGammaRealm?: boolean;
      SpeedtestUrl?: string[];
    }
    export interface RealmsItem_Unk006Item {
      TableName?: string;
      Id?: string;
    }
    export interface RealmsItem_Unk006 extends Array<RealmsItem_Unk006Item> {}
    export interface RealmsItem_Unk007 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\realms.json */
    export interface Realms extends Array<RealmsItem> {}
    
    export interface RecipeunlockdisplayItem {
      RecipeId?: number;
      Description?: string;
      CraftingItemClassCategoriesKeys?: RecipeunlockdisplayItem_CraftingItemClassCategoriesKeys;
      UnlockDescription?: string;
      Rank?: number;
      UnlockArea?: any;
    }
    export interface RecipeunlockdisplayItem_CraftingItemClassCategoriesKeysItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface RecipeunlockdisplayItem_CraftingItemClassCategoriesKeys extends Array<RecipeunlockdisplayItem_CraftingItemClassCategoriesKeysItem> {}
    /** Source: data\recipeunlockdisplay.json */
    export interface Recipeunlockdisplay extends Array<RecipeunlockdisplayItem> {}
    
    /** Source: data\recipeunlockobjects.json */
    export type Recipeunlockobjects = any[];
    
    export interface RelicinventorylayoutItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Requirement?: string;
    }
    /** Source: data\relicinventorylayout.json */
    export interface Relicinventorylayout extends Array<RelicinventorylayoutItem> {}
    
    /** Source: data\relicitemeffectvariations.json */
    export type Relicitemeffectvariations = any[];
    
    /** Source: data\reservationskillsaudio.json */
    export type Reservationskillsaudio = any[];
    
    /** Source: data\resistancepenaltyperarealevel.json */
    export type Resistancepenaltyperarealevel = any[];
    
    export interface RitualbalanceperlevelItem {
      MinLevel?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: number;
      Unk013?: number;
    }
    /** Source: data\ritualbalanceperlevel.json */
    export interface Ritualbalanceperlevel extends Array<RitualbalanceperlevelItem> {}
    
    export interface RitualconstantsItem {
      Id?: string;
      Value?: number;
    }
    /** Source: data\ritualconstants.json */
    export interface Ritualconstants extends Array<RitualconstantsItem> {}
    
    export interface RitualrunetypesItem {
      Id?: string;
      MiscAnimatedKey1?: RitualrunetypesItem_MiscAnimatedKey1;
      SpawnWeight?: number;
      LevelMin?: number;
      LevelMax?: number;
      BuffDefinitionsKey?: RitualrunetypesItem_BuffDefinitionsKey;
      BuffStatValues?: any[];
      SpawnPatterns?: RitualrunetypesItem_SpawnPatterns;
      ModsKey?: any[];
      Unk009?: any[];
      Unk010?: number[];
      MiscAnimatedKey2?: RitualrunetypesItem_MiscAnimatedKey2;
      EnvironmentsKey?: RitualrunetypesItem_EnvironmentsKey;
      Unk013?: number;
      Achievements?: any[];
      Type?: string;
      Description?: string;
      DaemonSpawningDataKey?: RitualrunetypesItem_DaemonSpawningDataKey;
      Unk018?: boolean;
    }
    export interface RitualrunetypesItem_MiscAnimatedKey1 {
      TableName?: string;
      Id?: string;
    }
    export interface RitualrunetypesItem_BuffDefinitionsKey {
      TableName?: string;
      Id?: string;
    }
    export interface RitualrunetypesItem_SpawnPatternsItem {
      TableName?: string;
      Id?: string;
    }
    export interface RitualrunetypesItem_SpawnPatterns extends Array<RitualrunetypesItem_SpawnPatternsItem> {}
    export interface RitualrunetypesItem_MiscAnimatedKey2 {
      TableName?: string;
      Id?: string;
    }
    export interface RitualrunetypesItem_EnvironmentsKey {
      TableName?: string;
      Id?: string;
    }
    export interface RitualrunetypesItem_DaemonSpawningDataKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\ritualrunetypes.json */
    export interface Ritualrunetypes extends Array<RitualrunetypesItem> {}
    
    export interface RitualsetkillachievementsItem {
      Achievement?: RitualsetkillachievementsItem_Achievement;
      KillBosses?: any[];
    }
    export interface RitualsetkillachievementsItem_Achievement {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\ritualsetkillachievements.json */
    export interface Ritualsetkillachievements extends Array<RitualsetkillachievementsItem> {}
    
    export interface RitualspawnpatternsItem {
      Id?: string;
      Unk001?: number;
      SpawnOrder?: string[];
      Unk003?: boolean;
    }
    /** Source: data\ritualspawnpatterns.json */
    export interface Ritualspawnpatterns extends Array<RitualspawnpatternsItem> {}
    
    export interface RogueexilelifescalingperlevelItem {
      Level?: number;
      AdditionalLife?: number;
    }
    /** Source: data\rogueexilelifescalingperlevel.json */
    export interface Rogueexilelifescalingperlevel extends Array<RogueexilelifescalingperlevelItem> {}
    
    /** Source: data\rogueexiles.json */
    export type Rogueexiles = any[];
    
    export interface RulesetsItem {
      Id?: string;
      Unk001?: any[];
    }
    /** Source: data\rulesets.json */
    export interface Rulesets extends Array<RulesetsItem> {}
    
    export interface RuniccirclesItem {
      Unk000?: string;
      Unk001?: number;
      Unk002?: any[];
      Unk003?: number;
    }
    /** Source: data\runiccircles.json */
    export interface Runiccircles extends Array<RuniccirclesItem> {}
    
    export interface SafehousebyocraftingItem {
      BetrayalJobsKey?: SafehousebyocraftingItem_BetrayalJobsKey;
      BetrayalTargetsKey?: SafehousebyocraftingItem_BetrayalTargetsKey;
      Rank?: number;
      Description?: string;
      ServerCommand?: string;
      Unk005?: any[];
      Description2?: string;
      ServerCommand2?: string;
    }
    export interface SafehousebyocraftingItem_BetrayalJobsKey {
      TableName?: string;
      Id?: string;
    }
    export interface SafehousebyocraftingItem_BetrayalTargetsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\safehousebyocrafting.json */
    export interface Safehousebyocrafting extends Array<SafehousebyocraftingItem> {}
    
    export interface SafehousecraftingspreecurrenciesItem {
      Id?: string;
      BaseItemTypesKey?: SafehousecraftingspreecurrenciesItem_BaseItemTypesKey;
      HasSpecificBaseItem?: boolean;
    }
    export interface SafehousecraftingspreecurrenciesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\safehousecraftingspreecurrencies.json */
    export interface Safehousecraftingspreecurrencies extends Array<SafehousecraftingspreecurrenciesItem> {}
    
    export interface SafehousecraftingspreetypeItem {
      Id?: string;
      Currencies?: SafehousecraftingspreetypeItem_Currencies;
      CurrencyCount?: number[];
      Unk003?: any[];
      Disabled?: boolean;
      ItemClassText?: string;
      Unk006?: number;
    }
    export interface SafehousecraftingspreetypeItem_CurrenciesItem {
      TableName?: string;
      Id?: string;
    }
    export interface SafehousecraftingspreetypeItem_Currencies extends Array<SafehousecraftingspreetypeItem_CurrenciesItem> {}
    /** Source: data\safehousecraftingspreetype.json */
    export interface Safehousecraftingspreetype extends Array<SafehousecraftingspreetypeItem> {}
    
    export interface SalvageboxesItem {
      BaseItemType?: SalvageboxesItem_BaseItemType;
      Id?: string;
      Unk002?: string;
    }
    export interface SalvageboxesItem_BaseItemType {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\salvageboxes.json */
    export interface Salvageboxes extends Array<SalvageboxesItem> {}
    
    export interface SanctumairlocksItem {
      Floor?: SanctumairlocksItem_Floor;
      Unk001?: number;
      Unk002?: number[];
      Area1?: SanctumairlocksItem_Area1;
      Area2?: SanctumairlocksItem_Area2;
    }
    export interface SanctumairlocksItem_Floor {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumairlocksItem_Area1 {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumairlocksItem_Area2 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sanctumairlocks.json */
    export interface Sanctumairlocks extends Array<SanctumairlocksItem> {}
    
    /** Source: data\sanctumbalanceperlevel.json */
    export type Sanctumbalanceperlevel = any[];
    
    export interface SanctumdefenceiconsItem {
      Id?: string;
      Stat?: SanctumdefenceiconsItem_Stat;
      DefenceIcon?: string;
      DefenceBrokenIcon?: string;
      BrokenStat?: any;
      Description?: string;
    }
    export interface SanctumdefenceiconsItem_Stat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sanctumdefenceicons.json */
    export interface Sanctumdefenceicons extends Array<SanctumdefenceiconsItem> {}
    
    export interface SanctumfloorsItem {
      Id?: string;
      Area?: SanctumfloorsItem_Area;
      Title?: SanctumfloorsItem_Title;
      RoomIcon?: string;
      BossIcon?: string;
      Description?: string;
      Summary?: SanctumfloorsItem_Summary;
      Itemised?: SanctumfloorsItem_Itemised;
    }
    export interface SanctumfloorsItem_Area {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumfloorsItem_Title {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumfloorsItem_Summary {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumfloorsItem_Itemised {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sanctumfloors.json */
    export interface Sanctumfloors extends Array<SanctumfloorsItem> {}
    
    export interface SanctumfodderlifescalingperlevelItem {
      Level?: number;
      Unk001?: number;
    }
    /** Source: data\sanctumfodderlifescalingperlevel.json */
    export interface Sanctumfodderlifescalingperlevel extends Array<SanctumfodderlifescalingperlevelItem> {}
    
    export interface SanctumlifescalingperlevelItem {
      Level?: number;
      Unk001?: number;
    }
    /** Source: data\sanctumlifescalingperlevel.json */
    export interface Sanctumlifescalingperlevel extends Array<SanctumlifescalingperlevelItem> {}
    
    export interface SanctumpersistenteffectcategoriesItem {
      Id?: string;
      Frame?: string;
      Popup?: string;
      Glow?: string;
      Curse?: boolean;
      Boon?: boolean;
      Icon?: string;
      Name?: string;
      Deferral?: boolean;
    }
    /** Source: data\sanctumpersistenteffectcategories.json */
    export interface Sanctumpersistenteffectcategories extends Array<SanctumpersistenteffectcategoriesItem> {}
    
    export interface SanctumpersistenteffectsItem {
      Id?: string;
      Stats?: SanctumpersistenteffectsItem_Stats;
      StatValues?: number[];
      Name?: string;
      Icon?: string;
      Unk005?: number;
      Unk006?: boolean;
      EffectCategory?: SanctumpersistenteffectsItem_EffectCategory;
      NextEffect?: any;
      Unk009?: string;
      BoonDesc?: string;
      CurseDesc?: string;
      Unk012?: number;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: any[];
      Guard?: SanctumpersistenteffectsItem_Guard;
      FirstEffect?: any;
      Unk018?: number;
      Unk019?: number;
      Unk020?: boolean;
      Unk021?: boolean;
      HASH16?: number;
    }
    export interface SanctumpersistenteffectsItem_StatsItem {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumpersistenteffectsItem_Stats extends Array<SanctumpersistenteffectsItem_StatsItem> {}
    export interface SanctumpersistenteffectsItem_EffectCategory {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumpersistenteffectsItem_GuardItem {
      TableName?: string;
      RowIndex?: number;
    }
    export interface SanctumpersistenteffectsItem_Guard extends Array<SanctumpersistenteffectsItem_GuardItem> {}
    /** Source: data\sanctumpersistenteffects.json */
    export interface Sanctumpersistenteffects extends Array<SanctumpersistenteffectsItem> {}
    
    /** Source: data\sanctumrewardobjects.json */
    export type Sanctumrewardobjects = any[];
    
    export interface SanctumroomsItem {
      Id?: string;
      ArmFile?: string;
      RoomType?: SanctumroomsItem_RoomType;
      Script?: string;
      Floor?: SanctumroomsItem_Floor;
      Area?: any;
    }
    export interface SanctumroomsItem_RoomType {
      TableName?: string;
      Id?: string;
    }
    export interface SanctumroomsItem_Floor {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sanctumrooms.json */
    export interface Sanctumrooms extends Array<SanctumroomsItem> {}
    
    export interface SanctumroomtypesItem {
      Id?: string;
      Unk001?: boolean;
      Unk002?: boolean;
      Unk003?: SanctumroomtypesItem_Unk003;
      Unk004?: SanctumroomtypesItem_Unk004;
      Unk005?: boolean;
      Icon?: string;
      Unk007?: boolean;
      Description?: string;
      Unk009?: string[];
      Rooms?: any[];
      Unk011?: string;
      Unk012?: boolean;
    }
    export interface SanctumroomtypesItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SanctumroomtypesItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\sanctumroomtypes.json */
    export interface Sanctumroomtypes extends Array<SanctumroomtypesItem> {}
    
    /** Source: data\sanctumselectiondisplayoverride.json */
    export type Sanctumselectiondisplayoverride = any[];
    
    /** Source: data\scarabs.json */
    export type Scarabs = any[];
    
    export interface ScoutingreportsItem {
      Id?: string;
      BaseItemType?: ScoutingreportsItem_BaseItemType;
      MinMapTier?: number;
    }
    export interface ScoutingreportsItem_BaseItemType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\scoutingreports.json */
    export interface Scoutingreports extends Array<ScoutingreportsItem> {}
    
    export interface SentinelcraftingcurrencyItem {
      Currency?: SentinelcraftingcurrencyItem_Currency;
      Type?: number;
    }
    export interface SentinelcraftingcurrencyItem_Currency {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sentinelcraftingcurrency.json */
    export interface Sentinelcraftingcurrency extends Array<SentinelcraftingcurrencyItem> {}
    
    /** Source: data\sentineldroneinventorylayout.json */
    export type Sentineldroneinventorylayout = any[];
    
    export interface SentinelpassivesItem {
      Id?: string;
      HASH16?: number;
      Unk002?: string;
      Unk003?: any[];
      Unk004?: any[];
      Unk005?: number;
      Unk006?: number;
      Unk007?: SentinelpassivesItem_Unk007;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
    }
    export interface SentinelpassivesItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\sentinelpassives.json */
    export interface Sentinelpassives extends Array<SentinelpassivesItem> {}
    
    export interface SentinelpassivestatsItem {
      Unk000?: SentinelpassivestatsItem_Unk000;
      Unk001?: SentinelpassivestatsItem_Unk001;
      Unk002?: number;
    }
    export interface SentinelpassivestatsItem_Unk000 {
      TableName?: string;
      Id?: string;
    }
    export interface SentinelpassivestatsItem_Unk001 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sentinelpassivestats.json */
    export interface Sentinelpassivestats extends Array<SentinelpassivestatsItem> {}
    
    export interface SentinelpassivetypesItem {
      Id?: string;
      DefaultIcon?: string;
      ActiveIcon?: string;
      DroneType?: any;
      Unk004?: number;
    }
    /** Source: data\sentinelpassivetypes.json */
    export interface Sentinelpassivetypes extends Array<SentinelpassivetypesItem> {}
    
    export interface SentinelpowerexplevelsItem {
      Unk000?: number;
      Unk001?: number;
    }
    /** Source: data\sentinelpowerexplevels.json */
    export interface Sentinelpowerexplevels extends Array<SentinelpowerexplevelsItem> {}
    
    export interface SentinelstoragelayoutItem {
      Id?: string;
      StoredItem?: SentinelstoragelayoutItem_StoredItem;
      DroneType?: any;
      Unk003?: boolean;
      TabIcon?: string;
      XOffset?: number;
      YOffset?: number;
      Unk007?: number;
      Unk008?: number;
      Width?: number;
      Height?: number;
      SlotSize?: number;
      Unk012?: any;
    }
    export interface SentinelstoragelayoutItem_StoredItem {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sentinelstoragelayout.json */
    export interface Sentinelstoragelayout extends Array<SentinelstoragelayoutItem> {}
    
    export interface SentineltaggedmonsterstatsItem {
      TaggedStat?: SentineltaggedmonsterstatsItem_TaggedStat;
      Unk001?: SentineltaggedmonsterstatsItem_Unk001;
      Unk002?: any[];
      Unk003?: any;
      Unk004?: any;
    }
    export interface SentineltaggedmonsterstatsItem_TaggedStat {
      TableName?: string;
      Id?: string;
    }
    export interface SentineltaggedmonsterstatsItem_Unk001 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sentineltaggedmonsterstats.json */
    export interface Sentineltaggedmonsterstats extends Array<SentineltaggedmonsterstatsItem> {}
    
    export interface SessionquestflagsItem {
      QuestFlag?: SessionquestflagsItem_QuestFlag;
    }
    export interface SessionquestflagsItem_QuestFlag {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sessionquestflags.json */
    export interface Sessionquestflags extends Array<SessionquestflagsItem> {}
    
    /** Source: data\shaperguardians.json */
    export type Shaperguardians = any[];
    
    /** Source: data\shapeshiftformclones.json */
    export type Shapeshiftformclones = any[];
    
    /** Source: data\shapeshiftforms.json */
    export type Shapeshiftforms = any[];
    
    /** Source: data\shapeshifttransformdata.json */
    export type Shapeshifttransformdata = any[];
    
    export interface ShieldtypesItem {
      BaseItemTypesKey?: ShieldtypesItem_BaseItemTypesKey;
      Block?: number;
    }
    export interface ShieldtypesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\shieldtypes.json */
    export interface Shieldtypes extends Array<ShieldtypesItem> {}
    
    export interface ShoptagItem {
      Id?: string;
      Name?: string;
      IsCategory?: boolean;
      Category?: any;
      SkillGem?: any[];
    }
    /** Source: data\shoptag.json */
    export interface Shoptag extends Array<ShoptagItem> {}
    
    export interface ShrinesItem {
      Id?: string;
      TimeoutInSeconds?: number;
      ChargesShared?: boolean;
      Player_ShrineBuffsKey?: ShrinesItem_Player_ShrineBuffsKey;
      Unk004?: number;
      Unk005?: number;
      Monster_ShrineBuffsKey?: ShrinesItem_Monster_ShrineBuffsKey;
      SummonMonster_MonsterVarietiesKey?: any;
      SummonPlayer_MonsterVarietiesKey?: any;
      Unk009?: number;
      Unk010?: number;
      ShrineSoundsKey?: ShrinesItem_ShrineSoundsKey;
      Unk012?: boolean;
      AchievementItemsKeys?: ShrinesItem_AchievementItemsKeys;
      IsPVPOnly?: boolean;
      Unk015?: boolean;
      IsLesserShrine?: boolean;
      Description?: ShrinesItem_Description;
      Name?: ShrinesItem_Name;
      Unk019?: boolean;
      Unk020?: any;
      Unk021?: any[];
    }
    export interface ShrinesItem_Player_ShrineBuffsKey {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ShrinesItem_Monster_ShrineBuffsKey {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ShrinesItem_ShrineSoundsKey {
      TableName?: string;
      Id?: string;
    }
    export interface ShrinesItem_AchievementItemsKeysItem {
      TableName?: string;
      Id?: string;
    }
    export interface ShrinesItem_AchievementItemsKeys extends Array<ShrinesItem_AchievementItemsKeysItem> {}
    export interface ShrinesItem_Description {
      TableName?: string;
      Id?: string;
    }
    export interface ShrinesItem_Name {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\shrines.json */
    export interface Shrines extends Array<ShrinesItem> {}
    
    export interface ShrinesoundsItem {
      Id?: string;
      StereoSoundFile?: string;
      MonoSoundFile?: string;
    }
    /** Source: data\shrinesounds.json */
    export interface Shrinesounds extends Array<ShrinesoundsItem> {}
    
    export interface ShrinevisualartvariationsItem {
      Unk000?: ShrinevisualartvariationsItem_Unk000;
      Unk001?: boolean;
      Unk002?: ShrinevisualartvariationsItem_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
    }
    export interface ShrinevisualartvariationsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface ShrinevisualartvariationsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\shrinevisualartvariations.json */
    export interface Shrinevisualartvariations extends Array<ShrinevisualartvariationsItem> {}
    
    export interface SigildisplayItem {
      Id?: string;
      Active_StatsKey?: SigildisplayItem_Active_StatsKey;
      Inactive_StatsKey?: SigildisplayItem_Inactive_StatsKey;
      DDSFile?: string;
      Inactive_ArtFile?: string;
      Active_ArtFile?: string;
      Frame_ArtFile?: string;
    }
    export interface SigildisplayItem_Active_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface SigildisplayItem_Inactive_StatsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\sigildisplay.json */
    export interface Sigildisplay extends Array<SigildisplayItem> {}
    
    export interface SinglegroundlaserItem {
      Id?: number;
      Unk001?: SinglegroundlaserItem_Unk001;
      Unk002?: SinglegroundlaserItem_Unk002;
      Unk003?: number;
      Unk004?: string;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: number;
      Unk010?: any;
      Unk011?: any;
      Unk012?: number;
      Unk013?: boolean;
      Unk014?: number;
      Unk015?: number;
    }
    export interface SinglegroundlaserItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SinglegroundlaserItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\singlegroundlaser.json */
    export interface Singlegroundlaser extends Array<SinglegroundlaserItem> {}
    
    export interface SkillartvariationsItem {
      Id?: string;
      Unk001?: SkillartvariationsItem_Unk001;
      Unk002?: any[];
      Unk003?: any[];
      Unk004?: any[];
      Variants?: string[];
      Unk006?: SkillartvariationsItem_Unk006;
      Unk007?: number[];
      Unk008?: any[];
      Unk009?: SkillartvariationsItem_Unk009;
      Unk010?: any[];
      Unk011?: any[];
      Unk012?: any[];
    }
    export interface SkillartvariationsItem_Unk001Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillartvariationsItem_Unk001 extends Array<SkillartvariationsItem_Unk001Item> {}
    export interface SkillartvariationsItem_Unk006Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillartvariationsItem_Unk006 extends Array<SkillartvariationsItem_Unk006Item> {}
    export interface SkillartvariationsItem_Unk009 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\skillartvariations.json */
    export interface Skillartvariations extends Array<SkillartvariationsItem> {}
    
    /** Source: data\skillcraftingdata.json */
    export type Skillcraftingdata = any[];
    
    /** Source: data\skillevents.json */
    export type Skillevents = any[];
    
    export interface SkillgeminfoItem {
      Id?: string;
      Description?: string;
      VideoURL1?: string;
      SkillGemsKey?: SkillgeminfoItem_SkillGemsKey;
      VideoURL2?: string;
      CharactersKeys?: any[];
    }
    export interface SkillgeminfoItem_SkillGemsKey {
      TableName?: string;
      RowIndex?: number;
    }
    /** Source: data\skillgeminfo.json */
    export interface Skillgeminfo extends Array<SkillgeminfoItem> {}
    
    export interface SkillgemlevelupeffectsItem {
      Id?: string;
      Unk001?: SkillgemlevelupeffectsItem_Unk001;
      Unk002?: SkillgemlevelupeffectsItem_Unk002;
      Unk003?: SkillgemlevelupeffectsItem_Unk003;
      Unk004?: SkillgemlevelupeffectsItem_Unk004;
    }
    export interface SkillgemlevelupeffectsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillgemlevelupeffectsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillgemlevelupeffectsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillgemlevelupeffectsItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\skillgemlevelupeffects.json */
    export interface Skillgemlevelupeffects extends Array<SkillgemlevelupeffectsItem> {}
    
    export interface SkillgemsItem {
      BaseItemTypesKey?: SkillgemsItem_BaseItemTypesKey;
      StrengthRequirementPercent?: number;
      DexterityRequirementPercent?: number;
      IntelligenceRequirementPercent?: number;
      VaalVariant_BaseItemTypesKey?: any;
      IsVaalVariant?: boolean;
      MinionGlobalSkillLevelStat?: any;
      IsSupport?: boolean;
      Unk008?: boolean;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: boolean;
      AwakenedVariant?: any;
      RegularVariant?: any;
      Unk015?: number;
      ItemExperienceType?: SkillgemsItem_ItemExperienceType;
      MtxSlotTypes?: any[];
      GemEffects?: any[];
    }
    export interface SkillgemsItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface SkillgemsItem_ItemExperienceType {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\skillgems.json */
    export interface Skillgems extends Array<SkillgemsItem> {}
    
    /** Source: data\skillgemsforuniquestat.json */
    export type Skillgemsforuniquestat = any[];
    
    /** Source: data\skillgemsupports.json */
    export type Skillgemsupports = any[];
    
    export interface SkillminevariationsItem {
      SkillMinesKey?: number;
      Unk001?: number;
      MiscObject?: any;
    }
    /** Source: data\skillminevariations.json */
    export interface Skillminevariations extends Array<SkillminevariationsItem> {}
    
    export interface SkillmorphdisplayItem {
      Unk000?: SkillmorphdisplayItem_Unk000;
      Unk001?: SkillmorphdisplayItem_Unk001;
      DDSFiles?: string[];
      Unk003?: number;
      Unk004?: any[];
      Unk005?: number;
      Unk006?: any[];
      Unk007?: boolean;
      Unk008?: boolean;
    }
    export interface SkillmorphdisplayItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillmorphdisplayItem_Unk001Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SkillmorphdisplayItem_Unk001 extends Array<SkillmorphdisplayItem_Unk001Item> {}
    /** Source: data\skillmorphdisplay.json */
    export interface Skillmorphdisplay extends Array<SkillmorphdisplayItem> {}
    
    export interface SkillsurgeeffectsItem {
      GrantedEffectsKey?: SkillsurgeeffectsItem_GrantedEffectsKey;
      Unk001?: any;
      Unk002?: boolean;
      Unk003?: boolean;
      Unk004?: boolean;
      MiscAnimated?: SkillsurgeeffectsItem_MiscAnimated;
      Unk006?: boolean;
      Unk007?: boolean;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: boolean;
      Unk012?: boolean;
    }
    export interface SkillsurgeeffectsItem_GrantedEffectsKey {
      TableName?: string;
      Id?: string;
    }
    export interface SkillsurgeeffectsItem_MiscAnimated {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\skillsurgeeffects.json */
    export interface Skillsurgeeffects extends Array<SkillsurgeeffectsItem> {}
    
    export interface SkilltotemvariationsItem {
      SkillTotemsKey?: number;
      TotemSkinId?: number;
      MonsterVarietiesKey?: SkilltotemvariationsItem_MonsterVarietiesKey;
    }
    export interface SkilltotemvariationsItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\skilltotemvariations.json */
    export interface Skilltotemvariations extends Array<SkilltotemvariationsItem> {}
    
    export interface SkilltrapvariationsItem {
      Id?: number;
      Metadata?: string;
      MiscAnimated?: any;
    }
    /** Source: data\skilltrapvariations.json */
    export interface Skilltrapvariations extends Array<SkilltrapvariationsItem> {}
    
    export interface SkillweaponeffectsItem {
      Unk000?: string;
      Unk001?: SkillweaponeffectsItem_Unk001;
      Unk002?: boolean;
      Unk003?: number;
      Unk004?: number;
    }
    export interface SkillweaponeffectsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\skillweaponeffects.json */
    export interface Skillweaponeffects extends Array<SkillweaponeffectsItem> {}
    
    /** Source: data\socketaudioevents.json */
    export type Socketaudioevents = any[];
    
    export interface SocketnotchesItem {
      Id?: string;
      Description?: string;
      RedSocketImage?: string;
      BlueSocketImage?: string;
      GreenSocketImage?: string;
    }
    /** Source: data\socketnotches.json */
    export interface Socketnotches extends Array<SocketnotchesItem> {}
    
    /** Source: data\soulcores.json */
    export type Soulcores = any[];
    
    export interface SoundeffectsItem {
      Id?: string;
      SoundFile?: string;
      SoundFile_2D?: string;
      Unk003?: boolean;
      Unk004?: string;
    }
    /** Source: data\soundeffects.json */
    export interface Soundeffects extends Array<SoundeffectsItem> {}
    
    export interface SpawnadditionalchestsorclustersItem {
      StatsKey?: SpawnadditionalchestsorclustersItem_StatsKey;
      ChestsKey?: any;
      ChestClustersKey?: SpawnadditionalchestsorclustersItem_ChestClustersKey;
    }
    export interface SpawnadditionalchestsorclustersItem_StatsKey {
      TableName?: string;
      Id?: string;
    }
    export interface SpawnadditionalchestsorclustersItem_ChestClustersKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\spawnadditionalchestsorclusters.json */
    export interface Spawnadditionalchestsorclusters extends Array<SpawnadditionalchestsorclustersItem> {}
    
    export interface SpawnobjectItem {
      Unk000?: number;
      Unk001?: SpawnobjectItem_Unk001;
      Unk002?: any[];
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: string;
      Unk013?: number;
      Unk014?: boolean;
      Unk015?: number;
    }
    export interface SpawnobjectItem_Unk001Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SpawnobjectItem_Unk001 extends Array<SpawnobjectItem_Unk001Item> {}
    /** Source: data\spawnobject.json */
    export interface Spawnobject extends Array<SpawnobjectItem> {}
    
    export interface SpecialroomsItem {
      Id?: string;
      ARMFile?: string;
    }
    /** Source: data\specialrooms.json */
    export interface Specialrooms extends Array<SpecialroomsItem> {}
    
    export interface SpecialtilesItem {
      Id?: string;
      TDTFile?: string;
    }
    /** Source: data\specialtiles.json */
    export interface Specialtiles extends Array<SpecialtilesItem> {}
    
    export interface SpectreoverridesItem {
      Monster?: SpectreoverridesItem_Monster;
      Spectre?: any;
      Unk002?: any[];
    }
    export interface SpectreoverridesItem_Monster {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\spectreoverrides.json */
    export interface Spectreoverrides extends Array<SpectreoverridesItem> {}
    
    export interface StartingpassiveskillsItem {
      Id?: string;
      PassiveSkills?: StartingpassiveskillsItem_PassiveSkills;
    }
    export interface StartingpassiveskillsItem_PassiveSkillsItem {
      TableName?: string;
      Id?: string;
    }
    export interface StartingpassiveskillsItem_PassiveSkills extends Array<StartingpassiveskillsItem_PassiveSkillsItem> {}
    /** Source: data\startingpassiveskills.json */
    export interface Startingpassiveskills extends Array<StartingpassiveskillsItem> {}
    
    export interface StashtabaffinitiesItem {
      SpecializedStash?: number;
      Name?: string;
      ShowInStashes?: number[];
    }
    /** Source: data\stashtabaffinities.json */
    export interface Stashtabaffinities extends Array<StashtabaffinitiesItem> {}
    
    export interface StashtypeItem {
      Id?: string;
      StashId?: number;
      Id2?: string;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Icon?: any;
    }
    /** Source: data\stashtype.json */
    export interface Stashtype extends Array<StashtypeItem> {}
    
    /** Source: data\statconvertaltattackcontainer.json */
    export type Statconvertaltattackcontainer = any[];
    
    export interface StatdescriptionfunctionsItem {
      Id?: string;
      TranslationId?: string;
    }
    /** Source: data\statdescriptionfunctions.json */
    export interface Statdescriptionfunctions extends Array<StatdescriptionfunctionsItem> {}
    
    /** Source: data\statistictrackingmicrotransactions.json */
    export type Statistictrackingmicrotransactions = any[];
    
    /** Source: data\statistictrackingmicrotransactionsstatistics.json */
    export type Statistictrackingmicrotransactionsstatistics = any[];
    
    export interface StatsItem {
      Id?: string;
      Unk001?: boolean;
      IsLocal?: boolean;
      IsWeaponLocal?: boolean;
      Semantics?: number;
      Text?: string;
      Unk006?: boolean;
      IsVirtual?: boolean;
      MainHandAlias_StatsKey?: any;
      OffHandAlias_StatsKey?: any;
      Unk010?: boolean;
      HASH32?: number;
      BelongsActiveSkillsKey?: any[];
      Category?: StatsItem_Category;
      Unk014?: boolean;
      Unk015?: boolean;
      IsScalable?: boolean;
      ContextFlags?: any[];
      Unk018?: any[];
    }
    export interface StatsItem_Category {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\stats.json */
    export interface Stats extends Array<StatsItem> {}
    
    export interface StatsaffectinggenerationItem {
      Stat?: StatsaffectinggenerationItem_Stat;
      StatValue?: number;
    }
    export interface StatsaffectinggenerationItem_Stat {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\statsaffectinggeneration.json */
    export interface Statsaffectinggeneration extends Array<StatsaffectinggenerationItem> {}
    
    export interface StatsfromskillstatsItem {
      Unk000?: StatsfromskillstatsItem_Unk000;
      Unk001?: StatsfromskillstatsItem_Unk001;
    }
    export interface StatsfromskillstatsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface StatsfromskillstatsItem_Unk001 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\statsfromskillstats.json */
    export interface Statsfromskillstats extends Array<StatsfromskillstatsItem> {}
    
    export interface StatvisualsItem {
      Unk000?: StatvisualsItem_Unk000;
      EPKFiles?: string[];
      Unk002?: boolean;
    }
    export interface StatvisualsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\statvisuals.json */
    export interface Statvisuals extends Array<StatvisualsItem> {}
    
    export interface StrongboxesItem {
      ChestsKey?: StrongboxesItem_ChestsKey;
      SpawnWeight?: number;
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: boolean;
      SpawnWeightIncrease?: any;
      SpawnWeightHardmode?: number;
    }
    export interface StrongboxesItem_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\strongboxes.json */
    export interface Strongboxes extends Array<StrongboxesItem> {}
    
    export interface SuicideexplosionItem {
      Id?: number;
      Unk001?: any;
      Unk002?: SuicideexplosionItem_Unk002;
      Unk003?: boolean;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: boolean;
      Unk007?: number;
      Unk008?: boolean;
    }
    export interface SuicideexplosionItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\suicideexplosion.json */
    export interface Suicideexplosion extends Array<SuicideexplosionItem> {}
    
    export interface SummonedspecificbarrelsItem {
      Id?: string;
      Chest?: SummonedspecificbarrelsItem_Chest;
      Unk002?: SummonedspecificbarrelsItem_Unk002;
      Unk003?: SummonedspecificbarrelsItem_Unk003;
      Unk004?: any;
      Unk005?: string;
    }
    export interface SummonedspecificbarrelsItem_Chest {
      TableName?: string;
      Id?: string;
    }
    export interface SummonedspecificbarrelsItem_Unk002 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface SummonedspecificbarrelsItem_Unk003 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\summonedspecificbarrels.json */
    export interface Summonedspecificbarrels extends Array<SummonedspecificbarrelsItem> {}
    
    export interface SummonedspecificmonstersItem {
      Id?: number;
      MonsterVarietiesKey?: SummonedspecificmonstersItem_MonsterVarietiesKey;
      Unk002?: number;
      Unk003?: any;
      Unk004?: boolean;
      Unk005?: boolean;
      Unk006?: number;
      Unk007?: number;
      Unk008?: boolean;
      Unk009?: any;
      Unk010?: any;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: number;
      Unk014?: string;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: number;
    }
    export interface SummonedspecificmonstersItem_MonsterVarietiesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\summonedspecificmonsters.json */
    export interface Summonedspecificmonsters extends Array<SummonedspecificmonstersItem> {}
    
    /** Source: data\summonedspecificmonstersondeath.json */
    export type Summonedspecificmonstersondeath = any[];
    
    /** Source: data\supportgems.json */
    export type Supportgems = any[];
    
    /** Source: data\surgeeffectpackartvariations.json */
    export type Surgeeffectpackartvariations = any[];
    
    export interface SurgeeffectsItem {
      Id?: string;
      Unk001?: SurgeeffectsItem_Unk001;
      Unk002?: number[];
      Unk003?: SurgeeffectsItem_Unk003;
      Unk004?: string[];
    }
    export interface SurgeeffectsItem_Unk001 {
      TableName?: string;
      Id?: string;
    }
    export interface SurgeeffectsItem_Unk003Item {
      TableName?: string;
      Id?: string;
    }
    export interface SurgeeffectsItem_Unk003 extends Array<SurgeeffectsItem_Unk003Item> {}
    /** Source: data\surgeeffects.json */
    export interface Surgeeffects extends Array<SurgeeffectsItem> {}
    
    export interface SurgetypesItem {
      Id?: string;
      SurgeEffects?: SurgetypesItem_SurgeEffects;
      IntId?: number;
    }
    export interface SurgetypesItem_SurgeEffectsItem {
      TableName?: string;
      Id?: string;
    }
    export interface SurgetypesItem_SurgeEffects extends Array<SurgetypesItem_SurgeEffectsItem> {}
    /** Source: data\surgetypes.json */
    export interface Surgetypes extends Array<SurgetypesItem> {}
    
    export interface TablechargeItem {
      Unk000?: number;
      Unk001?: number;
      Unk002?: number;
      Unk003?: boolean;
      Unk004?: TablechargeItem_Unk004;
      Unk005?: boolean;
      Unk006?: TablechargeItem_Unk006;
      Unk007?: TablechargeItem_Unk007;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: number;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: any;
      Unk015?: any;
      Unk016?: number;
      Unk017?: boolean;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: number;
      Unk022?: number;
      Unk023?: number;
      Unk024?: number;
      Unk025?: boolean;
      Unk026?: boolean;
      Unk027?: number;
    }
    export interface TablechargeItem_Unk004 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface TablechargeItem_Unk006Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface TablechargeItem_Unk006 extends Array<TablechargeItem_Unk006Item> {}
    export interface TablechargeItem_Unk007 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\tablecharge.json */
    export interface Tablecharge extends Array<TablechargeItem> {}
    
    export interface TablemonsterspawnersItem {
      Metadata?: string;
      AreaLevel?: number;
      SpawnsMonsters?: TablemonsterspawnersItem_SpawnsMonsters;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: number;
      Unk010?: number;
      Unk011?: boolean;
      Unk012?: boolean;
      Unk013?: boolean;
      Unk014?: boolean;
      Unk015?: boolean;
      Unk016?: boolean;
      Unk017?: number;
      Unk018?: number;
      Unk019?: number;
      Unk020?: number;
      Unk021?: any;
      Unk022?: boolean;
      Unk023?: boolean;
      Script1?: string;
      Unk025?: boolean;
      Unk026?: boolean;
      Script2?: string;
      Unk028?: number[];
      Unk029?: number;
      Unk030?: number;
      Unk031?: number;
      Unk032?: number;
      Unk033?: number;
      Unk034?: number;
      Unk035?: number;
      Unk036?: number;
    }
    export interface TablemonsterspawnersItem_SpawnsMonstersItem {
      TableName?: string;
      Id?: string;
    }
    export interface TablemonsterspawnersItem_SpawnsMonsters extends Array<TablemonsterspawnersItem_SpawnsMonstersItem> {}
    /** Source: data\tablemonsterspawners.json */
    export interface Tablemonsterspawners extends Array<TablemonsterspawnersItem> {}
    
    export interface TagsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
    }
    /** Source: data\tags.json */
    export interface Tags extends Array<TagsItem> {}
    
    export interface TalismanmonstermodsItem {
      ModTypeKey?: TalismanmonstermodsItem_ModTypeKey;
      ModsKey?: TalismanmonstermodsItem_ModsKey;
    }
    export interface TalismanmonstermodsItem_ModTypeKey {
      TableName?: string;
      RowIndex?: number;
    }
    export interface TalismanmonstermodsItem_ModsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\talismanmonstermods.json */
    export interface Talismanmonstermods extends Array<TalismanmonstermodsItem> {}
    
    /** Source: data\talismanpacks.json */
    export type Talismanpacks = any[];
    
    /** Source: data\talismans.json */
    export type Talismans = any[];
    
    export interface TalkingpetaudioeventsItem {
      Event?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: any[];
      Unk005?: any[];
      Unk006?: number;
    }
    /** Source: data\talkingpetaudioevents.json */
    export interface Talkingpetaudioevents extends Array<TalkingpetaudioeventsItem> {}
    
    /** Source: data\talkingpetnpcaudio.json */
    export type Talkingpetnpcaudio = any[];
    
    export interface TalkingpetsItem {
      Unk000?: TalkingpetsItem_Unk000;
      Unk001?: TalkingpetsItem_Unk001;
    }
    export interface TalkingpetsItem_Unk000 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface TalkingpetsItem_Unk001Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface TalkingpetsItem_Unk001 extends Array<TalkingpetsItem_Unk001Item> {}
    /** Source: data\talkingpets.json */
    export interface Talkingpets extends Array<TalkingpetsItem> {}
    
    export interface TencentautolootpetcurrenciesItem {
      BaseItemTypesKey?: TencentautolootpetcurrenciesItem_BaseItemTypesKey;
      Unk001?: boolean;
      Unk002?: any[];
    }
    export interface TencentautolootpetcurrenciesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\tencentautolootpetcurrencies.json */
    export interface Tencentautolootpetcurrencies extends Array<TencentautolootpetcurrenciesItem> {}
    
    export interface TencentautolootpetcurrenciesexcludableItem {
      BaseItemTypesKey?: TencentautolootpetcurrenciesexcludableItem_BaseItemTypesKey;
    }
    export interface TencentautolootpetcurrenciesexcludableItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\tencentautolootpetcurrenciesexcludable.json */
    export interface Tencentautolootpetcurrenciesexcludable extends Array<TencentautolootpetcurrenciesexcludableItem> {}
    
    export interface TerrainpluginsItem {
      Id?: string;
      Unk001?: number;
      Unk002?: boolean;
      Unk003?: boolean;
    }
    /** Source: data\terrainplugins.json */
    export interface Terrainplugins extends Array<TerrainpluginsItem> {}
    
    /** Source: data\threetoonerecipes.json */
    export type Threetoonerecipes = any[];
    
    export interface TieredmicrotransactionsItem {
      MTX?: TieredmicrotransactionsItem_MTX;
      TierThresholds?: number[];
      Unk002?: TieredmicrotransactionsItem_Unk002;
      Unk003?: any[];
      Unk004?: any;
      TierCount?: number;
      Unk006?: any[];
      Unk007?: any[];
      Unk008?: any[];
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: any;
      Unk012?: boolean;
    }
    export interface TieredmicrotransactionsItem_MTX {
      TableName?: string;
      RowIndex?: number;
    }
    export interface TieredmicrotransactionsItem_Unk002 {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\tieredmicrotransactions.json */
    export interface Tieredmicrotransactions extends Array<TieredmicrotransactionsItem> {}
    
    /** Source: data\tieredmicrotransactionsvisuals.json */
    export type Tieredmicrotransactionsvisuals = any[];
    
    export interface TipsItem {
      Id?: string;
      Text?: string;
      TextXBox?: string;
    }
    /** Source: data\tips.json */
    export interface Tips extends Array<TipsItem> {}
    
    export interface TopologiesItem {
      Id?: string;
      DGRFile?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
    }
    /** Source: data\topologies.json */
    export interface Topologies extends Array<TopologiesItem> {}
    
    /** Source: data\tormentspirits.json */
    export type Tormentspirits = any[];
    
    /** Source: data\totemdefendervarieties.json */
    export type Totemdefendervarieties = any[];
    
    /** Source: data\touchinteractiontype.json */
    export type Touchinteractiontype = any[];
    
    export interface TrademarketcategoryItem {
      Id?: string;
      Name?: string;
      StyleFlag?: number;
      Group?: TrademarketcategoryItem_Group;
      Unk004?: number[];
      Unk005?: boolean;
      IsDisabled?: boolean;
    }
    export interface TrademarketcategoryItem_Group {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\trademarketcategory.json */
    export interface Trademarketcategory extends Array<TrademarketcategoryItem> {}
    
    export interface TrademarketcategorygroupsItem {
      Id?: string;
      Name?: string;
    }
    /** Source: data\trademarketcategorygroups.json */
    export interface Trademarketcategorygroups extends Array<TrademarketcategorygroupsItem> {}
    
    export interface TrademarketcategorylistallclassItem {
      TradeCategory?: TrademarketcategorylistallclassItem_TradeCategory;
      ItemClass?: TrademarketcategorylistallclassItem_ItemClass;
    }
    export interface TrademarketcategorylistallclassItem_TradeCategory {
      TableName?: string;
      Id?: string;
    }
    export interface TrademarketcategorylistallclassItem_ItemClass {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\trademarketcategorylistallclass.json */
    export interface Trademarketcategorylistallclass extends Array<TrademarketcategorylistallclassItem> {}
    
    /** Source: data\trademarketimplicitmoddisplay.json */
    export type Trademarketimplicitmoddisplay = any[];
    
    export interface TrademarketindexitemasItem {
      Item?: TrademarketindexitemasItem_Item;
      IndexAs?: TrademarketindexitemasItem_IndexAs;
    }
    export interface TrademarketindexitemasItem_Item {
      TableName?: any;
      RowIndex?: number;
    }
    export interface TrademarketindexitemasItem_IndexAs {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\trademarketindexitemas.json */
    export interface Trademarketindexitemas extends Array<TrademarketindexitemasItem> {}
    
    /** Source: data\traptools.json */
    export type Traptools = any[];
    
    /** Source: data\treasurehuntermissions.json */
    export type Treasurehuntermissions = any[];
    
    export interface TriggerbeamItem {
      Unk000?: number;
      Unk001?: TriggerbeamItem_Unk001;
      Unk002?: TriggerbeamItem_Unk002;
      Unk003?: number[];
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: number;
      Unk009?: boolean;
      Unk010?: any[];
      Unk011?: boolean;
      Unk012?: number;
      Unk013?: boolean;
    }
    export interface TriggerbeamItem_Unk001Item {
      TableName?: string;
      Id?: string;
    }
    export interface TriggerbeamItem_Unk001 extends Array<TriggerbeamItem_Unk001Item> {}
    export interface TriggerbeamItem_Unk002Item {
      TableName?: string;
      Id?: string;
    }
    export interface TriggerbeamItem_Unk002 extends Array<TriggerbeamItem_Unk002Item> {}
    /** Source: data\triggerbeam.json */
    export interface Triggerbeam extends Array<TriggerbeamItem> {}
    
    /** Source: data\triggeredaudioeventvolumeoverrides.json */
    export type Triggeredaudioeventvolumeoverrides = any[];
    
    /** Source: data\triggerspawners.json */
    export type Triggerspawners = any[];
    
    export interface TrythenewleagueversionsItem {
      League?: string;
      Logo?: string;
    }
    /** Source: data\trythenewleagueversions.json */
    export interface Trythenewleagueversions extends Array<TrythenewleagueversionsItem> {}
    
    export interface TutorialItem {
      Id?: string;
      UIFile?: string;
      ClientString?: TutorialItem_ClientString;
      IsEnabled?: boolean;
      Unk004?: number;
      Unk005?: any[];
      Unk006?: TutorialItem_Unk006;
      Unk007?: number;
      Unk008?: any[];
      Unk009?: boolean;
      Unk010?: boolean;
      Unk011?: number;
    }
    export interface TutorialItem_ClientString {
      TableName?: string;
      Id?: string;
    }
    export interface TutorialItem_Unk006 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\tutorial.json */
    export interface Tutorial extends Array<TutorialItem> {}
    
    /** Source: data\ultimatumencountertypes.json */
    export type Ultimatumencountertypes = any[];
    
    /** Source: data\ultimatumencountertypesserver.json */
    export type Ultimatumencountertypesserver = any[];
    
    /** Source: data\ultimatummodifiers.json */
    export type Ultimatummodifiers = any[];
    
    export interface UltimatummodifiertypesItem {
      Id?: string;
      Unk001?: boolean;
    }
    /** Source: data\ultimatummodifiertypes.json */
    export interface Ultimatummodifiertypes extends Array<UltimatummodifiertypesItem> {}
    
    /** Source: data\ultimatummonsterpackfamily.json */
    export type Ultimatummonsterpackfamily = any[];
    
    /** Source: data\ultimatumrooms.json */
    export type Ultimatumrooms = any[];
    
    /** Source: data\ultimatumtriallength.json */
    export type Ultimatumtriallength = any[];
    
    export interface UltimatumtrialmasteraudioItem {
      Id?: string;
      Variant?: number;
      Unk002?: number;
      Unk003?: number;
      TextAudio?: UltimatumtrialmasteraudioItem_TextAudio;
      RoundsMin?: number;
      RoundsMax?: number;
    }
    export interface UltimatumtrialmasteraudioItem_TextAudio {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\ultimatumtrialmasteraudio.json */
    export interface Ultimatumtrialmasteraudio extends Array<UltimatumtrialmasteraudioItem> {}
    
    /** Source: data\ultimatumwagertypes.json */
    export type Ultimatumwagertypes = any[];
    
    /** Source: data\uncutgemadditionaltiers.json */
    export type Uncutgemadditionaltiers = any[];
    
    /** Source: data\uncutgemtiers.json */
    export type Uncutgemtiers = any[];
    
    export interface UniquechestsItem {
      Id?: string;
      WordsKey?: UniquechestsItem_WordsKey;
      FlavourTextKey?: UniquechestsItem_FlavourTextKey;
      MinLevel?: number;
      ModsKeys?: any[];
      SpawnWeight?: number;
      Unk006?: any[];
      AOFile?: string;
      Unk008?: boolean;
      Unk009?: any[];
      AppearanceChestsKey?: any;
      ChestsKey?: UniquechestsItem_ChestsKey;
      Unk012?: any[];
    }
    export interface UniquechestsItem_WordsKey {
      TableName?: string;
      Text?: string;
    }
    export interface UniquechestsItem_FlavourTextKey {
      TableName?: string;
      Id?: string;
    }
    export interface UniquechestsItem_ChestsKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\uniquechests.json */
    export interface Uniquechests extends Array<UniquechestsItem> {}
    
    export interface UniquejewellimitsItem {
      JewelName?: UniquejewellimitsItem_JewelName;
      Limit?: number;
    }
    export interface UniquejewellimitsItem_JewelName {
      TableName?: string;
      Text?: string;
    }
    /** Source: data\uniquejewellimits.json */
    export interface Uniquejewellimits extends Array<UniquejewellimitsItem> {}
    
    /** Source: data\uniquemaps.json */
    export type Uniquemaps = any[];
    
    export interface UniquestashlayoutItem {
      WordsKey?: UniquestashlayoutItem_WordsKey;
      ItemVisualIdentityKey?: UniquestashlayoutItem_ItemVisualIdentityKey;
      UniqueStashTypesKey?: UniquestashlayoutItem_UniqueStashTypesKey;
      SomeRef01?: UniquestashlayoutItem_SomeRef01;
      ShowIfEmptyChallengeLeague?: boolean;
      ShowIfEmptyStandard?: boolean;
      RenamedVersion?: any;
      IsAlternateArt?: boolean;
    }
    export interface UniquestashlayoutItem_WordsKey {
      TableName?: string;
      Text?: string;
    }
    export interface UniquestashlayoutItem_ItemVisualIdentityKey {
      TableName?: string;
      Id?: string;
    }
    export interface UniquestashlayoutItem_UniqueStashTypesKey {
      TableName?: string;
      Id?: string;
    }
    export interface UniquestashlayoutItem_SomeRef01 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\uniquestashlayout.json */
    export interface Uniquestashlayout extends Array<UniquestashlayoutItem> {}
    
    export interface UniquestashtypesItem {
      Id?: string;
      Order?: number;
      Width?: number;
      Height?: number;
      TotalCount?: number;
      Unk005?: number;
      Name?: string;
      StandardCount?: number;
      Image?: string;
      ChallengeLeagueCount?: number;
      IsDisabled?: boolean;
    }
    /** Source: data\uniquestashtypes.json */
    export interface Uniquestashtypes extends Array<UniquestashtypesItem> {}
    
    /** Source: data\utilityflaskbuffs.json */
    export type Utilityflaskbuffs = any[];
    
    /** Source: data\visualpinproperties.json */
    export type Visualpinproperties = any[];
    
    /** Source: data\warbandsgraph.json */
    export type Warbandsgraph = any[];
    
    /** Source: data\warbandsmapgraph.json */
    export type Warbandsmapgraph = any[];
    
    /** Source: data\warbandspackmonsters.json */
    export type Warbandspackmonsters = any[];
    
    export interface WarbandspacknumbersItem {
      Id?: string;
      SpawnChance?: number;
      MinLevel?: number;
      MaxLevel?: number;
      Tier4Number?: number;
      Unk005?: number;
      Tier3Number?: number;
      Unk007?: number;
      Tier2Number?: number;
      Unk009?: number;
      Tier1Number?: number;
    }
    /** Source: data\warbandspacknumbers.json */
    export interface Warbandspacknumbers extends Array<WarbandspacknumbersItem> {}
    
    export interface WeaponclassesItem {
      ItemClass?: WeaponclassesItem_ItemClass;
      Unk001?: number;
    }
    export interface WeaponclassesItem_ItemClass {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\weaponclasses.json */
    export interface Weaponclasses extends Array<WeaponclassesItem> {}
    
    export interface WeaponimpactsounddataItem {
      Id?: string;
      Unk001?: number;
      Unk002?: number;
      Unk003?: number;
      Unk004?: number;
      Unk005?: number;
    }
    /** Source: data\weaponimpactsounddata.json */
    export interface Weaponimpactsounddata extends Array<WeaponimpactsounddataItem> {}
    
    /** Source: data\weaponsoundtypes.json */
    export type Weaponsoundtypes = any[];
    
    export interface WeapontypesItem {
      BaseItemTypesKey?: WeapontypesItem_BaseItemTypesKey;
      Critical?: number;
      Unk02?: number;
      Unk03?: number;
      Unk04?: number;
      RangeMax?: number;
      Speed?: number;
      DamageMin?: number;
      DamageMax?: number;
      Unk009?: number;
      ReloadTime?: number;
    }
    export interface WeapontypesItem_BaseItemTypesKey {
      TableName?: string;
      Id?: string;
    }
    /** Source: data\weapontypes.json */
    export interface Weapontypes extends Array<WeapontypesItem> {}
    
    export interface WieldableclassesItem {
      Unk01?: WieldableclassesItem_Unk01;
      Unk02?: boolean;
      Unk03?: boolean;
      Unk04?: WieldableclassesItem_Unk04;
      Unk05?: any;
      Unk06?: WieldableclassesItem_Unk06;
      Unk07?: WieldableclassesItem_Unk07;
      Unk08?: any;
      Unk09?: any;
      Unk10?: any;
      Unk11?: any;
      Unk12?: any;
      Unk13?: any;
      Unk14?: any;
      Unk15?: any;
      Unk16?: any;
      Unk17?: any;
      Unk18?: any;
      Unk19?: any;
      Unk20?: any;
      Unk21?: any;
      Unk22?: any;
      Unk23?: any;
      Unk24?: WieldableclassesItem_Unk24;
      Unk25?: WieldableclassesItem_Unk25;
      Unk26?: any;
      Unk27?: any;
      Unk28?: number;
    }
    export interface WieldableclassesItem_Unk01 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface WieldableclassesItem_Unk04 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface WieldableclassesItem_Unk06 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface WieldableclassesItem_Unk07 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface WieldableclassesItem_Unk24 {
      TableName?: any;
      RowIndex?: number;
    }
    export interface WieldableclassesItem_Unk25 {
      TableName?: any;
      RowIndex?: number;
    }
    /** Source: data\wieldableclasses.json */
    export interface Wieldableclasses extends Array<WieldableclassesItem> {}
    
    export interface WindowcursorsItem {
      Id?: string;
      CursorDefault?: string;
      CursorClick?: string;
      Unk003?: number;
      Unk004?: number;
      CursorHover?: string;
      Description?: string;
      IsEnabled?: boolean;
      Unk008?: number;
    }
    /** Source: data\windowcursors.json */
    export interface Windowcursors extends Array<WindowcursorsItem> {}
    
    export interface WordsItem {
      Wordlist?: number;
      Text?: string;
      SpawnWeight_Tags?: WordsItem_SpawnWeight_Tags;
      SpawnWeight_Values?: number[];
      Unk004?: number;
      Text2?: string;
      Inflection?: string;
    }
    export interface WordsItem_SpawnWeight_TagsItem {
      TableName?: string;
      Id?: string;
    }
    export interface WordsItem_SpawnWeight_Tags extends Array<WordsItem_SpawnWeight_TagsItem> {}
    /** Source: data\words.json */
    export interface Words extends Array<WordsItem> {}
    
    /** Source: data\worldarealeaguechances.json */
    export type Worldarealeaguechances = any[];
    
    export interface WorldareasItem {
      Id?: string;
      Name?: string;
      Act?: number;
      IsTown?: boolean;
      HasWaypoint?: boolean;
      ConnectedWorldAreas?: any[];
      AreaLevel?: number;
      UnkLong01?: number;
      UnkArray01?: any[];
      UnkRef01?: any;
      UnkArray02?: any[];
      UnkInt01?: number;
      SomehowConnectedAreasMaybe?: any[];
    }
    /** Source: data\worldareas.json */
    export interface Worldareas extends Array<WorldareasItem> {}
    
    /** Source: data\worldmaplegends.json */
    export type Worldmaplegends = any[];
    
    export interface WorldpopupicontypesItem {
      Id?: string;
      Unk001?: string;
      Unk002?: number;
      Unk003?: number;
      Unk004?: boolean;
      Unk005?: number;
      Unk006?: number;
      Unk007?: number;
      Unk008?: string;
    }
    /** Source: data\worldpopupicontypes.json */
    export interface Worldpopupicontypes extends Array<WorldpopupicontypesItem> {}
    
    /** Source: data\worldscreenmappindialogue.json */
    export type Worldscreenmappindialogue = any[];
    
  }

}
